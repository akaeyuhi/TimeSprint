import { makeAutoObservable, runInAction } from 'mobx';
import { Team } from 'src/models/team.model';
import { User } from 'src/models/user.model';
import { CreateProjectDto } from 'src/services/dto/project/create-project.dto';
import TeamService from 'src/services/team.service';

export class TeamStore {
  error: Error | null = null;
  isLoading = false;
  current: Team = {} as Team;

  constructor(private readonly teamService: TeamService) {
    makeAutoObservable(this);
  }

  isAdmin(user: User) {
    return !!this.current.admins.find(admin => admin.id === user.id);
  }

  isMember(user: User) {
    return !!this.current.members.find(member => member.id === user.id);
  }

  getUserById(id: number) {
    return this.current.members.find(member => member.id === id);
  }

  async fetch(teamId: number) {
    this.isLoading = true;
    try {
      const team = <Team> await this.teamService.getTeam(teamId);
      runInAction(() => {
        this.current = team;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
    return this.current;
  }

  getProjects() {
    return this.current.projects;
  }

  async createProject(projectDto: CreateProjectDto) {
    this.isLoading = true;
    try {
      this.current = <Team> await this.teamService.createProject(
        this.current.id,
        projectDto,
      );
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.isLoading = false;
    }
    return this.current.projects;
  }

  async deleteProject(projectId: number) {
    this.isLoading = true;
    try {
      this.current = <Team> await this.teamService.deleteProject(
        this.current.id,
        projectId,
      );
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.isLoading = false;
    }
    return this.current.projects;
  }

  async addMember(user: User) {
    this.isLoading = true;
    try {
      if (!this.isMember(user)) {
        this.current = <Team> await this.teamService.addMember(this.current.id, user.id);
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
        this.current = <Team> await this.teamService.addAdmin(this.current.id, user.id);
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
        this.current = <Team> await this.teamService.deleteMember(this.current.id, userId);
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
        this.current = <Team> await this.teamService.deleteAdmin(this.current.id, userId);
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
