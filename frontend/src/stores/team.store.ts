import { makeAutoObservable, runInAction } from 'mobx';
import { Team } from 'src/models/team.model';
import { User } from 'src/models/user.model';
import { ProjectDto } from 'src/services/dto/project.dto';
import TeamService from 'src/services/team.service';

export class TeamStore {
  error: Error | null = null;
  isLoading = false;
  current: Team = {} as Team;

  constructor(private readonly teamService: TeamService) {
    makeAutoObservable(this);
  }

  isAdmin(user: User | string) {
    const id = typeof user === 'object' ? (user as User).id : user;
    return !!this.current.admins.find((admin) => admin.id === id);
  }

  isMember(user: User | string) {
    const id = typeof user === 'object' ? (user as User).id : user;
    return !!this.current.members.find((member) => member.id === id);
  }

  getUserById(id: string) {
    return this.current.members.find((member) => member.id === id);
  }

  async fetch(teamId: string) {
    this.isLoading = true;
    try {
      const team = await this.teamService.getTeam(teamId);
      if (!team) return this.current;
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

  async createProject(projectDto: ProjectDto) {
    this.isLoading = true;
    try {
      const project = await this.teamService.createProject(
        this.current.id,
        projectDto
      );
      if (!project) return this.current.projects;
      runInAction(() => {
        this.current.projects.push(project);
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
    return this.current.projects;
  }

  async deleteProject(projectId: string) {
    this.isLoading = true;
    try {
      const result = await this.teamService.deleteProject(
        this.current.id,
        projectId
      );
      if (!result) return this.current.projects;
      runInAction(() => {
        this.current.projects = this.current.projects.filter(
          (project) => project.id !== projectId
        );
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
    return this.current.projects;
  }

  async addMember(user: User) {
    this.isLoading = true;
    try {
      if (!this.isMember(user)) {
        const newMember = await this.teamService.addMember(
          this.current.id,
          user.id
        );
        if (!newMember) return user;
        runInAction(() => {
          this.current.members.push(newMember);
        });
      } else {
        runInAction(() => {
          this.error = new Error('User already in team');
        });
      }
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
    return user;
  }

  async addAdmin(user: User) {
    this.isLoading = true;
    try {
      if (!this.isAdmin(user)) {
        const newAdmin = await this.teamService.addAdmin(
          this.current.id,
          user.id
        );
        if (!newAdmin) return user;
        runInAction(() => {
          this.current.admins.push(newAdmin);
        });
      } else {
        runInAction(() => {
          this.error = new Error('User already admin');
        });
      }
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    this.isLoading = true;
    try {
      const user = this.getUserById(userId);
      await runInAction(async () => {
        if (user && !this.isAdmin(user)) {
          const result = await this.teamService.deleteMember(
            this.current.id,
            userId
          );
          if (result === null) return;
          this.current.members = this.current.members.filter(
            (member) => member.id !== userId
          );
        } else if (user && this.isAdmin(user)) {
          this.error = new Error('This user has admin privilege');
        } else {
          this.error = new Error('User does not exist');
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
      this.error = error as Error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async deleteAdmin(userId: string): Promise<void> {
    this.isLoading = true;
    try {
      const user = this.getUserById(userId);
      await runInAction(async () => {
        if (user && this.isAdmin(user)) {
          const result = await this.teamService.deleteAdmin(
            this.current.id,
            userId
          );
          if (result === null) return;
          this.current.admins = this.current.admins.filter(
            (admin) => admin.id !== userId
          );
        } else if (user && !this.isAdmin(user)) {
          this.error = new Error('This user has no admin privilege');
        } else {
          this.error = new Error('User does not exist');
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
      this.error = error as Error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
