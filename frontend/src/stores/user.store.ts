import { action, makeObservable, observable, runInAction } from 'mobx';
import { User } from 'src/models/user.model';
import { TaskDto } from 'src/services/dto/task.dto';
import { Task } from 'src/models/task.model';
import { Team } from 'src/models/team.model';
import { CreateTeamDto } from 'src/services/dto/create-team.dto';
import TaskStore from 'src/stores/task.store';
import UserService from 'src/services/user.service';
import TeamService from 'src/services/team.service';

export class UserStore extends TaskStore<User> {
  @observable error: Error | null = null;
  @observable isLoading = false;
  @observable.deep current: User = {} as User;
  @observable.deep tasks: Task[] = [] as Task[];

  constructor(
    private readonly userService: UserService,
    private readonly teamService: TeamService
  ) {
    super();
    makeObservable(this);
  }

  @action
  async fetch(userId: number): Promise<User> {
    this.isLoading = true;
    try {
      const user = <User>await this.userService.getUser(userId);
      runInAction(() => {
        this.current = user;
        this.tasks = this.current.tasks;
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

  @action
  async fetchByUsername(username: string): Promise<void> {
    this.isLoading = true;
    try {
      const user = await this.userService.getUserByUsername(username);
      if (user) {
        runInAction(() => {
          this.current = user;
          this.tasks = this.current.tasks;
          this.isLoading = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
        this.isLoading = false;
      });
    }
  }

  @action
  async createTask(task: TaskDto): Promise<Task[]> {
    this.isLoading = true;
    try {
      const newTask = <Task>(
        await this.userService.createTask(task, this.current as User)
      );
      runInAction(() => {
        this.tasks.push(newTask);
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
    return this.tasks;
  }

  @action
  async updateTask(taskId: number, taskDto: TaskDto): Promise<Task[]> {
    this.isLoading = true;
    try {
      const updatedTask = <Task>(
        await this.userService.updateTask(taskDto, taskId)
      );
      runInAction(() => {
        const index = this.tasks.findIndex((task) => task.id === taskId);
        if (index !== -1) this.tasks[index] = updatedTask;
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
    return this.tasks;
  }

  @action
  async deleteTask(taskId: number): Promise<void> {
    this.isLoading = true;
    try {
      await this.userService.deleteTask(taskId, this.current as User);
      runInAction(() => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  @action
  async toggleTask(taskId: number): Promise<Task[]> {
    this.isLoading = true;
    try {
      const task = this.getTaskById(taskId);
      if (!task) throw new Error('Task not found');
      const toggledTask = <Task>await this.userService.toggleTask(task);
      runInAction(() => {
        const index = this.tasks.findIndex((t) => t.id === taskId);
        if (index !== -1) this.tasks[index] = toggledTask;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
    return this.tasks;
  }

  getUserTeamById(teamId: number): Team | null {
    return this.current?.teams.find((team) => team.id === teamId) ?? null;
  }

  @action
  async joinTeam(teamId: number): Promise<Team[]> {
    this.isLoading = true;
    try {
      const newTeam = <Team>await this.teamService.joinTeam(teamId);
      runInAction(() => {
        this.current?.teams.push(newTeam);
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
    return this.current.teams;
  }

  @action
  async leaveTeam(teamId: number): Promise<number> {
    this.isLoading = true;
    try {
      await this.teamService.leaveTeam(teamId);
      runInAction(() => {
        if (this.current) {
          this.current.teams = this.current?.teams.filter(
            (team) => team.id !== teamId
          );
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = <Error>error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
    return teamId;
  }

  @action
  async createTeam(teamDto: CreateTeamDto): Promise<Team> {
    this.isLoading = true;
    try {
      const newTeam = <Team>await this.teamService.createTeam(teamDto);
      runInAction(() => {
        this.current?.teams.push(newTeam);
      });
      return newTeam;
    } catch (error) {
      runInAction(() => {
        this.error = <Error>error;
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  @action
  async update(id: number, updateDto: Partial<User>): Promise<User> {
    this.isLoading = true;
    try {
      const updatedUser = <User>(
        await this.userService.updateUser(id, updateDto)
      );
      runInAction(() => {
        this.current = updatedUser;
      });
      return updatedUser;
    } catch (error) {
      runInAction(() => {
        this.error = <Error>error;
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  @action
  async loadImportantTasks() {
    this.isLoading = true;
    try {
      const newTasks = <Task[]>(
        await this.userService.getImportantUserTasks(this.current.id)
      );
      runInAction(() => {
        this.setTasks(newTasks);
      });
      return newTasks;
    } catch (error) {
      runInAction(() => {
        this.error = <Error>error;
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
