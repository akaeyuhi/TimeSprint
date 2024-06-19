import {
  BadRequestException,
  forwardRef,
  Inject,
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
import { TeamRole } from 'src/user/utils';

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
    userId: string,
  ): Promise<Team> {
    const admins = [];
    const members = [];
    createTeamDto.adminIds = [];
    createTeamDto.adminIds.push(userId);
    for (const id of createTeamDto.adminIds) {
      const admin = await this.userService.findById(id);
      members.push(admin);
      admins.push(admin);
    }
    if (!admins.length || !createTeamDto.adminIds) {
      throw new NotFoundException('Admin not found');
    }
    return await this.teamRepository.create({
      ...createTeamDto,
      members,
      admins,
      projects: [],
    });
  }

  async findById(id: string): Promise<Team> {
    return this.teamRepository.findById(id);
  }

  async joinTeam(userId: string, teamId: string): Promise<User> {
    return await this.addMember(teamId, userId);
  }

  async leaveTeam(userId: string, teamId: string): Promise<void> {
    return await this.deleteMember(userId, teamId);
  }

  async addMember(teamId: string, memberId: string): Promise<User> {
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
    await this.teamRepository.addMember(team, member);
    return member;
  }

  async addProjectToTeam(team: Team, project: Project) {
    return this.teamRepository.addProjectToTeam(team, project);
  }

  async addAdmin(teamId: string, adminId: string): Promise<User> {
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
    await this.teamRepository.addAdmin(team, admin);
    return admin;
  }

  async getTeamIdByProject(projectId: string): Promise<string> {
    return await this.teamRepository.getTeamIdByProject(projectId);
  }

  async getUserRoleInTeam(userId: string, teamId: string): Promise<TeamRole> {
    const team = await this.teamRepository.findById(teamId);

    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    const user = team.members.find(user => user.id === userId);

    if (!user) {
      return null; // User is not a member of the team
    }

    return this.isAdmin(user, team) ? TeamRole.ADMIN : TeamRole.COLLABORATOR;
  }

  async deleteTeam(teamId: string): Promise<void> {
    await this.teamRepository.delete(teamId);
  }

  async getAllTeams(): Promise<Team[]> {
    return await this.teamRepository.findAll();
  }

  async getTeamProjects(teamId: string): Promise<Project[]> {
    return (await this.findById(teamId)).projects;
  }

  async updateTeam(
    teamId: string,
    updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }
    return await this.teamRepository.update(teamId, updateTeamDto);
  }

  async findTeamsByAdminId(adminId: string): Promise<Team[]> {
    return await this.teamRepository.findByAdmin(adminId);
  }

  async findTeamsByMemberId(memberId: string): Promise<Team[]> {
    return await this.teamRepository.findByMember(memberId);
  }

  async createTeamProject(
    teamId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const team = await this.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    const newProject =
      await this.projectService.createProject(createProjectDto);
    await this.teamRepository.addProjectToTeam(team, newProject);
    return newProject;
  }

  async deleteTeamProject(teamId: string, projectId: string): Promise<void> {
    try {
      return await this.projectService.deleteProject(projectId);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteAdmin(teamId: string, adminId: string): Promise<void> {
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
    await this.teamRepository.addAdmin(team, admin);
  }

  async deleteMember(teamId: string, memberId: string): Promise<void> {
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
    await this.teamRepository.deleteMember(team, member);
    await this.clearDeletedMemberTasks(member, team);
  }

  async clearDeletedMemberTasks(user: User, team: Team) {
    for (const project of team.projects) {
      await this.projectService.clearAssignedUser(user, project);
    }
  }

  private isMember(user: User, team: Team) {
    return team.members.find(member => member.id === user.id);
  }

  private isAdmin(user: User, team: Team) {
    return team.admins.find(admin => admin.id === user.id);
  }
}
