import BaseService from './base.service';
import { Return } from 'src/services/types';
import { Team } from 'src/models/team.model';
import { TeamError } from 'src/services/errors/team.error';
import { TeamDto } from 'src/services/dto/team.dto';
import { ProjectDto } from 'src/services/dto/project.dto';
import { Project } from 'src/models/project.model';
import { User } from 'src/models/user.model';

class TeamService extends BaseService {
  async getTeam(id: string): Promise<Return<Team>> {
    try {
      return await this.httpRequest.get<Team>(`/teams/${id}`);
    } catch (error) {
      throw new TeamError('Error fetching team data');
    }
  }

  async getAllTeams(): Promise<Return<Team[]>> {
    try {
      return await this.httpRequest.get<Team[]>('/teams');
    } catch (error) {
      throw new TeamError('Error fetching teams data');
    }
  }

  async createTeam(createTeamDto: TeamDto): Promise<Return<Team>> {
    try {
      return this.httpRequest.post<Team>('/teams', createTeamDto);
    } catch (error) {
      throw new TeamError('Error creating user');
    }
  }

  async updateTeam(id: string, team: Partial<TeamDto>): Promise<Return<Team>> {
    try {
      return this.httpRequest.put<Team>(`/teams/${id}`, team);
    } catch (error) {
      throw new TeamError('Error updating team data');
    }
  }

  async deleteTeam(id: string): Promise<Return<void>> {
    try {
      return this.httpRequest.delete<void>(`/teams/${id}`);
    } catch (error) {
      throw new TeamError('Error deleting team data');
    }
  }

  async leaveTeam(teamId: string): Promise<Return<void>> {
    try {
      return this.httpRequest.put<void>(`/teams/${teamId}/leave`, {});
    } catch (error) {
      throw new TeamError('Error leaving team');
    }
  }

  async joinTeam(teamId: string): Promise<Return<Team>> {
    try {
      return this.httpRequest.put<Team>(`/users/${teamId}/join`, {});
    } catch (error) {
      throw new TeamError('Error joining team');
    }
  }

  async addMember(teamId: string, memberId: string): Promise<Return<User>> {
    try {
      return this.httpRequest.put<User>(
        `/teams/${teamId}/add-member/${memberId}`,
        {}
      );
    } catch (error) {
      throw new TeamError('Error adding team member');
    }
  }

  async addAdmin(teamId: string, adminId: string): Promise<Return<User>> {
    try {
      return this.httpRequest.put<User>(
        `/teams/${teamId}/add-admin/${adminId}`,
        {}
      );
    } catch (error) {
      throw new TeamError('Error adding team admin');
    }
  }

  async deleteMember(teamId: string, memberId: string): Promise<Return<void>> {
    try {
      return this.httpRequest.delete<void>(
        `/teams/${teamId}/delete-member/${memberId}`
      );
    } catch (error) {
      throw new TeamError('Error deleting team member');
    }
  }

  async deleteAdmin(teamId: string, adminId: string): Promise<Return<void>> {
    try {
      return this.httpRequest.delete<void>(
        `/teams/${teamId}/delete-admin/${adminId}`
      );
    } catch (error) {
      throw new TeamError('Error deleting team admin');
    }
  }

  async deleteProject(
    teamId: string,
    projectId: string
  ): Promise<Return<void>> {
    try {
      return this.httpRequest.delete<void>(
        `/teams/${teamId}/projects/${projectId}`
      );
    } catch (error) {
      throw new TeamError('Error deleting team project');
    }
  }

  async createProject(
    teamId: string,
    createProjectDto: ProjectDto
  ): Promise<Return<Project>> {
    try {
      return this.httpRequest.post<Project>(
        `/teams/${teamId}/projects/`,
        createProjectDto
      );
    } catch (error) {
      throw new TeamError('Error creating team project');
    }
  }

  async getTeamProjects(teamId: string): Promise<Return<Project[]>> {
    try {
      return this.httpRequest.get<Project[]>(`/teams/${teamId}/projects/`);
    } catch (error) {
      throw new TeamError('Error getting team projects');
    }
  }
}

export default TeamService;
