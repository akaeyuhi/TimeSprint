import {
  BadRequestException, forwardRef, Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { UpdateTeamDto } from 'src/team/dto/update-team.dto';
import { CreateProjectDto } from 'src/project/dto/create-project.dto';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/entities/project.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly userService: UserService,
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
  ) {}

  async createTeam(
    createTeamDto: CreateTeamDto,
    userId: number,
  ): Promise<Team> {
    const admins = [];
    createTeamDto.adminIds.push(userId);
    for (const id of createTeamDto.adminIds) {
      const admin = await this.userService.findById(id);
      admins.push(admin);
    }
    if (!admins.length || !createTeamDto.adminIds) {
      throw new NotFoundException('Admin not found');
    }
    return await this.teamRepository.create({ ...createTeamDto, admins });
  }

  async findById(id: number): Promise<Team> {
    return this.teamRepository.findById(id);
  }

  async joinTeam(userId: number, teamId: number): Promise<Team> {
    return await this.addMember(teamId, userId);
  }

  async leaveTeam(userId: number, teamId: number): Promise<Team> {
    return await this.deleteMember(userId, teamId);
  }

  private isMember(user: User, team: Team) {
    return team.members.find(member => member.id === user.id);
  }

  private isAdmin(user: User, team: Team) {
    return team.admins.find(admin => admin.id === user.id);
  }

  async addMember(teamId: number, memberId: number): Promise<Team> {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    const member = await this.userService.findById(memberId);
    if (!member) {
      throw new NotFoundException('User not found');
    }
    if (this.isMember(member, team)) {
      throw new BadRequestException('User is already a member of the team');
    }
    return this.teamRepository.addMember(team, member);
  }

  async addAdmin(teamId: number, adminId: number): Promise<Team> {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    const admin = await this.userService.findById(adminId);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    if (!this.isMember(admin, team)) {
      throw new BadRequestException(
        'User must be a member of the team to be an admin',
      );
    }
    if (this.isAdmin(admin, team)) {
      throw new BadRequestException('User is already an admin of the team');
    }
    return this.teamRepository.addAdmin(team, admin);
  }

  async getTeamIdByProject(projectId: number): Promise<number> {
    return await this.teamRepository.getTeamIdByProject(projectId);
  }

  async getUserRoleInTeam(userId: number, teamId: number): Promise<string> {
    return await this.teamRepository.getUserRoleInTeam(userId, teamId);
  }

  async deleteTeam(teamId: number): Promise<void> {
    await this.teamRepository.delete(teamId);
  }

  async getAllTeams(): Promise<Team[]> {
    return await this.teamRepository.findAll();
  }

  async getTeamProjects(teamId: number): Promise<Project[]> {
    return (await this.findById(teamId)).projects;
  }

  async updateTeam(
    teamId: number,
    updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }
    return await this.teamRepository.update(teamId, updateTeamDto);
  }

  async findTeamsByAdminId(adminId: number): Promise<Team[]> {
    return await this.teamRepository.findByAdmin(adminId);
  }

  async findTeamsByMemberId(memberId: number): Promise<Team[]> {
    return await this.teamRepository.findByMember(memberId);
  }

  async createTeamProject(
    teamId: number,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    try {
      const team = await this.findById(teamId);
      const newProject =
        await this.projectService.createProject(createProjectDto);
      return await this.projectService.assignProjectToTeam(newProject.id, team);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteTeamProject(teamId: number, projectId: number): Promise<void> {
    try {
      return await this.projectService.deleteProject(projectId);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteAdmin(teamId: number, adminId: number): Promise<Team> {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    const admin = await this.userService.findById(adminId);
    if (!admin) {
      throw new NotFoundException('Member not found');
    }
    if (!this.isMember(admin, team)) {
      throw new BadRequestException('User must be a member of the team');
    }
    if (!this.isAdmin(admin, team)) {
      throw new BadRequestException(`User isn't admin of the team`);
    }
    return this.teamRepository.addAdmin(team, admin);
  }

  async deleteMember(teamId: number, memberId: number): Promise<Team> {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    const member = await this.userService.findById(memberId);
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    if (!this.isMember(member, team)) {
      throw new BadRequestException('User must be a member of the team');
    }
    if (this.isAdmin(member, team)) {
      await this.teamRepository.deleteAdmin(team, member);
    }
    return this.teamRepository.addAdmin(team, member);
  }
}
