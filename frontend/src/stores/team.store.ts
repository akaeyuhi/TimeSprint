import { makeAutoObservable } from 'mobx';
import { Team } from 'src/models/team.model';
import { User } from 'src/models/user.model';
import { CreateProjectDto } from 'src/services/dto/project/create-project.dto';
import TeamService from 'src/services/team.service';

export class TeamStore {
  error: Error | null = null;
  isLoading = false;
  currentTeam: Team = {} as Team;

  constructor(private readonly teamService: TeamService) {
    makeAutoObservable(this);
  }

  isAdmin(user: User) {
    return !!this.currentTeam.admins.find(admin => admin.id === user.id);
  }

  isMember(user: User) {
    return !!this.currentTeam.members.find(member => member.id === user.id);
  }

  getUserById(id: number) {
    return this.currentTeam.members.find(member => member.id === id);
  }

  async fetch(teamId: number) {
    this.isLoading = true;
    try {
      this.currentTeam = <Team> await this.teamService.getTeam(teamId);
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.isLoading = false;
    }
    return this.currentTeam;
  }

  getProjects() {
    return this.currentTeam.projects;
  }

  async createProject(projectDto: CreateProjectDto) {
    this.isLoading = true;
    try {
      this.currentTeam = <Team> await this.teamService.createProject(
        this.currentTeam.id,
        projectDto
      );
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.isLoading = false;
    }
    return this.currentTeam.projects;
  }

  async deleteProject(projectId: number) {
    this.isLoading = true;
    try {
      this.currentTeam = <Team> await this.teamService.deleteProject(
        this.currentTeam.id,
        projectId
      );
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.isLoading = false;
    }
    return this.currentTeam.projects;
  }

  async addMember(user: User) {
    this.isLoading = true;
    try {
      if (!this.isMember(user)) {
        this.currentTeam = <Team> await this.teamService.addMember(this.currentTeam.id, user.id);
      } else {
        this.error = new Error('User already in team');
      }
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.isLoading = false;
    }
    return user;
  }

  async addAdmin(user: User) {
    this.isLoading = true;
    try {
      if (!this.isAdmin(user)) {
        this.currentTeam = <Team> await this.teamService.addAdmin(this.currentTeam.id, user.id);
      } else {
        this.error = new Error('User already is admin');
      }
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.isLoading = false;
    }
    return user;
  }

  async deleteUser(userId: number): Promise<void> {
    this.isLoading = true;
    try {
      const user = this.getUserById(userId);
      if (user && !this.isAdmin(user)) {
        this.currentTeam = <Team> await this.teamService.deleteMember(this.currentTeam.id, userId);
      } else if (user && this.isAdmin(user)) {
        this.error = new Error('This user has admin privilege');
      } else {
        this.error = new Error('User does not exist');
      }
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.isLoading = false;
    }
  }

  async deleteAdmin(userId: number): Promise<void> {
    this.isLoading = true;
    try {
      const user = this.getUserById(userId);
      if (user && this.isAdmin(user)) {
        this.currentTeam = <Team> await this.teamService.deleteAdmin(this.currentTeam.id, userId);
      } else if (user && !this.isAdmin(user)) {
        this.error = new Error('This user has no admin privilege');
      } else {
        this.error = new Error('User does not exist');
      }
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.isLoading = false;
    }
  }
}
