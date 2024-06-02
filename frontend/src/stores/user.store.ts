import { action, makeObservable, observable, runInAction } from 'mobx';
import { User } from 'src/models/user.model';
import { CreateTaskDto } from 'src/services/dto/task/create-task.dto';
import { Task } from 'src/models/task.model';
import { Team } from 'src/models/team.model';
import { UpdateTaskDto } from 'src/services/dto/task/update-task.dto';
import { CreateTeamDto } from 'src/services/dto/team/create-team.dto';
import TaskStore from 'src/stores/task.store';
import UserService from 'src/services/user.service';
import TeamService from 'src/services/team.service';

export class UserStore extends TaskStore<User> {
  @observable error: Error | null = null;
  @observable isLoading = false;
  @observable.deep current: User | null = null;
  @observable.deep tasks: Task[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly teamService: TeamService
  ) {
    super();
    makeObservable(this);
  }

  @action
  async fetch(userId: number): Promise<void> {
    this.isLoading = true;
    try {
      const user = <User> await this.userService.getUser(userId);
      runInAction(() => {
        this.current = user;
        this.tasks = user.tasks;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
        this.isLoading = false;
      });
    }
  }

  @action
  async fetchByUsername(username: string): Promise<void> {
    this.isLoading = true;
    try {
      const user = await this.userService.getUserByUsername(username);
      if (user) {
        runInAction(() => {
          this.current = user;
          this.tasks = user.tasks;
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
  async createTask(task: CreateTaskDto): Promise<Task> {
    this.isLoading = true;
    try {
      const newTask = <Task> await this.userService.createTask(task, this.current as User);
      runInAction(() => {
        this.tasks.push(newTask);
        this.isLoading = false;
      });
      return newTask;
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
        this.isLoading = false;
      });
      throw error;
    }
  }

  @action
  async updateTask(taskId: number, taskDto: UpdateTaskDto): Promise<Task | null> {
    this.isLoading = true;
    try {
      const updatedTask = <Task> await this.userService.updateTask(taskDto, taskId);
      runInAction(() => {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) this.tasks[index] = updatedTask;
        this.isLoading = false;
      });
      return updatedTask;
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
        this.isLoading = false;
      });
      throw error;
    }
  }

  @action
  async deleteTask(taskId: number): Promise<void> {
    this.isLoading = true;
    try {
      await this.userService.deleteTask(taskId, this.current!);
      runInAction(() => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
        this.isLoading = false;
      });
      throw error;
    }
  }

  @action
  async toggleTask(taskId: number): Promise<Task | null> {
    this.isLoading = true;
    try {
      const task = this.getTaskById(taskId);
      if (!task) throw new Error('Task not found');
      const toggledTask = <Task> await this.userService.toggleTask(task);
      runInAction(() => {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) this.tasks[index] = toggledTask;
        this.isLoading = false;
      });
      return toggledTask;
    } catch (error) {
      runInAction(() => {
        this.error = <Error> error;
        this.isLoading = false;
      });
      throw error;
    }
  }

  getTaskById(taskId: number): Task | null {
    return this.tasks.find(task => task.id === taskId) ?? null;
  }

  getUserTeamById(teamId: number): Team | null {
    return this.current?.teams.find(team => team.id === teamId) ?? null;
  }

  @action
  async joinTeam(teamId: number): Promise<Team> {
    this.isLoading = true;
    try {
      const newTeam = <Team> await this.teamService.joinTeam(teamId);
      runInAction(() => {
        this.current?.teams.push(newTeam);
        this.isLoading = false;
      });
      return newTeam;
    } catch (error) {
      runInAction(() => {
        this.error = <Error> error;
        this.isLoading = false;
      });
      throw error;
    }
  }

  @action
  async leaveTeam(teamId: number): Promise<number> {
    this.isLoading = true;
    try {
      await this.teamService.leaveTeam(teamId);
      runInAction(() => {
        if (this.current) {
          this.current.teams = this.current?.teams.filter(team => team.id !== teamId);
          this.isLoading = false;
        }
      });
      return teamId;
    } catch (error) {
      runInAction(() => {
        this.error = <Error> error;
        this.isLoading = false;
      });
      throw error;
    }
  }

  @action
  async createTeam(teamDto: CreateTeamDto): Promise<Team> {
    this.isLoading = true;
    try {
      const newTeam = <Team> await this.teamService.createTeam(teamDto);
      runInAction(() => {
        this.current?.teams.push(newTeam);
        this.isLoading = false;
      });
      return newTeam;
    } catch (error) {
      runInAction(() => {
        this.error = <Error> error;
        this.isLoading = false;
      });
      throw error;
    }
  }

  @action
  async update(id: number, updateDto: Partial<User>): Promise<User> {
    this.isLoading = true;
    try {
      const updatedUser = <User> await this.userService.updateUser(id, updateDto);
      runInAction(() => {
        this.current = updatedUser;
        this.isLoading = false;
      });
      return updatedUser;
    } catch (error) {
      runInAction(() => {
        this.error = <Error> error;
        this.isLoading = false;
      });
      throw error;
    }
  }

  @action
  sortTasks(sorted: Task[]): void {
    this.tasks = sorted;
  }

  getTasks(): Task[] {
    return [];
  }
}
