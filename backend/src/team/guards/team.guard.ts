import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TeamRole } from 'src/user/utils';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class TeamRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => TeamService))
    private readonly teamService: TeamService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.get<TeamRole>(
      'role',
      context.getHandler(),
    );
    if (!requiredRole) {
      return true; // No role is required, so allow access
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id; // The user object is attached to the request

    // Check if the user has the required role in the team associated with the project
    let teamId = +request.params.teamId;
    if (!teamId) {
      const projectId = +request.params.projectId;
      teamId = await this.teamService.getTeamIdByProject(projectId);
    }
    const userRoleInTeam = await this.teamService.getUserRoleInTeam(
      userId,
      teamId,
    );
    return userRoleInTeam === requiredRole;
  }
}
