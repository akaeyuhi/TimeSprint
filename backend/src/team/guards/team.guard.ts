import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/utils';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class TeamRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly teamService: TeamService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.get<UserRole>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRole) {
      return true; // No role is required, so allow access
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id; // The user object is attached to the request

    // Check if the user has the required role in the team associated with the project
    const projectId = +request.params.projectId;
    const teamId = await this.teamService.getTeamIdByProject(projectId);
    const userRoleInTeam = await this.teamService.getUserRoleInTeam(
      userId,
      teamId,
    );
    return userRoleInTeam === requiredRole;
  }
}