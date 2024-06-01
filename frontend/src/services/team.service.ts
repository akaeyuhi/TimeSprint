import BaseService from './base.service';
import { TeamReturn } from 'src/services/types';
import { Team } from 'src/models/team.model';
import { TeamError } from 'src/services/errors/team.error';
import { CreateTeamDto } from 'src/services/dto/team/create-team.dto';
import { CreateProjectDto } from 'src/services/dto/project/create-project.dto';

class TeamService extends BaseService {
  async getTeam(id: number): Promise<TeamReturn> {
    try {
      return await this.httpRequest.get<Team>(`/teams/${id}`);
    } catch (error) {
      throw new TeamError('Error fetching team data');
    }
  }

  async getAllTeams(): Promise<TeamReturn> {
    try {
      return await this.httpRequest.get<Team[]>('/teams');
    } catch (error) {
      throw new TeamError('Error fetching teams data');
    }
  }

  async createTeam(createTeamDto: CreateTeamDto): Promise<TeamReturn> {
    try {
      return this.httpRequest.post<Team>('/users', createTeamDto);
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

  async deleteTeam(id: number): Promise<TeamReturn> {
    try {
      return this.httpRequest.delete<Team>(`/teams/${id}`);
    } catch (error) {
      throw new TeamError('Error deleting team data');
    }
  }

  async leaveTeam(teamId: number): Promise<TeamReturn> {
    try {
      return this.httpRequest.put<Team>(`/teams/${teamId}/leave`, {});
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

  async addMember(teamId: number, memberId: number): Promise<TeamReturn> {
    try {
      return this.httpRequest.put<Team>(`/teams/${teamId}/add-member/${memberId}`, {});
    } catch (error) {
      throw new TeamError('Error adding team member');
    }
  }

  async addAdmin(teamId: number, adminId: number): Promise<TeamReturn> {
    try {
      return this.httpRequest.put<Team>(`/teams/${teamId}/add-admin/${adminId}`, {});
    } catch (error) {
      throw new TeamError('Error adding team admin');
    }
  }

  async deleteMember(teamId: number, memberId: number): Promise<TeamReturn> {
    try {
      return this.httpRequest.delete<Team>(`/teams/${teamId}/delete-member/${memberId}`);
    } catch (error) {
      throw new TeamError('Error deleting team member');
    }
  }

  async deleteAdmin(teamId: number, adminId: number): Promise<TeamReturn> {
    try {
      return this.httpRequest.delete<Team>(`/teams/${teamId}/delete-admin/${adminId}`);
    } catch (error) {
      throw new TeamError('Error deleting team admin');
    }
  }

  async deleteProject(teamId: number, projectId: number): Promise<TeamReturn> {
    try {
      return this.httpRequest.delete<Team>(`/teams/${teamId}/projects/${projectId}`);
    } catch (error) {
      throw new TeamError('Error deleting team project');
    }
  }

  async createProject(teamId: number, createProjectDto: CreateProjectDto): Promise<TeamReturn> {
    try {
      return this.httpRequest.post<Team>(`/teams/${teamId}/projects/`, createProjectDto);
    } catch (error) {
      throw new TeamError('Error creating team project');
    }
  }

  async getTeamProjects(teamId: number): Promise<TeamReturn> {
    try {
      return this.httpRequest.get<Team>(`/teams/${teamId}/projects/`);
    } catch (error) {
      throw new TeamError('Error getting team projects');
    }
  }
}

export default TeamService;
