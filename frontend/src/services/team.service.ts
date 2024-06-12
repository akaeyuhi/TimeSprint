import BaseService from './base.service';
import { ProjectReturn, TeamReturn, UserReturn } from 'src/services/types';
import { Team } from 'src/models/team.model';
import { TeamError } from 'src/services/errors/team.error';
import { CreateTeamDto } from 'src/services/dto/team/create-team.dto';
import { CreateProjectDto } from 'src/services/dto/project/create-project.dto';
import { Project } from 'src/models/project.model';
import { User } from 'src/models/user.model';

class TeamService extends BaseService {
  async getTeam(id: number): Promise<TeamReturn> {
    try {
      return await this.httpRequest.get<Team>(`/teams/${id}`);
    } catch (error) {
      throw new TeamError('Error fetching team data');
    }
  }

  async getAllTeams(): Promise<Team[] | null> {
    try {
      return await this.httpRequest.get<Team[]>('/teams');
    } catch (error) {
      throw new TeamError('Error fetching teams data');
    }
  }

  async createTeam(createTeamDto: CreateTeamDto): Promise<TeamReturn> {
    try {
      return this.httpRequest.post<Team>('/teams', createTeamDto);
    } catch (error) {
      throw new TeamError('Error creating user');
    }
  }

  async updateTeam(id: number, team: Partial<CreateTeamDto>): Promise<TeamReturn> {
    try {
      return this.httpRequest.put<Team>(`/teams/${id}`, team);
    } catch (error) {
      throw new TeamError('Error updating team data');
    }
  }

  async deleteTeam(id: number): Promise<void | null> {
    try {
      return this.httpRequest.delete<void>(`/teams/${id}`);
    } catch (error) {
      throw new TeamError('Error deleting team data');
    }
  }

  async leaveTeam(teamId: number): Promise<void | null> {
    try {
      return this.httpRequest.put<void>(`/teams/${teamId}/leave`, {});
    } catch (error) {
      throw new TeamError('Error leaving team');
    }
  }

  async joinTeam(teamId: number): Promise<TeamReturn> {
    try {
      return this.httpRequest.put<Team>(`/users/${teamId}/join`, {});
    } catch (error) {
      throw new TeamError('Error joining team');
    }
  }

  async addMember(teamId: number, memberId: number): Promise<UserReturn> {
    try {
      return this.httpRequest.put<User>(`/teams/${teamId}/add-member/${memberId}`, {});
    } catch (error) {
      throw new TeamError('Error adding team member');
    }
  }

  async addAdmin(teamId: number, adminId: number): Promise<UserReturn> {
    try {
      return this.httpRequest.put<User>(`/teams/${teamId}/add-admin/${adminId}`, {});
    } catch (error) {
      throw new TeamError('Error adding team admin');
    }
  }

  async deleteMember(teamId: number, memberId: number): Promise<void | null> {
    try {
      return this.httpRequest.delete<void>(`/teams/${teamId}/delete-member/${memberId}`);
    } catch (error) {
      throw new TeamError('Error deleting team member');
    }
  }

  async deleteAdmin(teamId: number, adminId: number): Promise<void | null> {
    try {
      return this.httpRequest.delete<void>(`/teams/${teamId}/delete-admin/${adminId}`);
    } catch (error) {
      throw new TeamError('Error deleting team admin');
    }
  }

  async deleteProject(teamId: number, projectId: number): Promise<void | null> {
    try {
      return this.httpRequest.delete<void>(`/teams/${teamId}/projects/${projectId}`);
    } catch (error) {
      throw new TeamError('Error deleting team project');
    }
  }

  async createProject(teamId: number, createProjectDto: CreateProjectDto): Promise<ProjectReturn> {
    try {
      return this.httpRequest.post<Project>(`/teams/${teamId}/projects/`, createProjectDto);
    } catch (error) {
      throw new TeamError('Error creating team project');
    }
  }

  async getTeamProjects(teamId: number): Promise<Project[] | null> {
    try {
      return this.httpRequest.get<Project[]>(`/teams/${teamId}/projects/`);
    } catch (error) {
      throw new TeamError('Error getting team projects');
    }
  }
}

export default TeamService;
