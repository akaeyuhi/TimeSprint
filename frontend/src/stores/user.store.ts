import { action, makeObservable, observable, runInAction } from 'mobx';
import { User } from 'src/models/user.model';
import { TaskDto } from 'src/services/dto/task.dto';
import { Task } from 'src/models/task.model';
import { Team } from 'src/models/team.model';
import { TeamDto } from 'src/services/dto/team.dto';
import TaskStore from 'src/stores/task.store';
import UserService from 'src/services/user.service';
import TeamService from 'src/services/team.service';
import { LeisureActivityDto } from 'src/services/dto/activity.dto';
import { LeisureActivity } from 'src/models/activity.model';
import { ActivityService } from 'src/services/activity.service';

export class UserStore extends TaskStore<User> {
  @observable error: Error | null = null;
  @observable isLoading = false;
  @observable.deep current: User = {} as User;
  @observable.deep tasks: Task[] = [] as Task[];

  constructor(
    private readonly userService: UserService,
    private readonly teamService: TeamService,
    private readonly activityService: ActivityService
  ) {
    super();
    makeObservable(this);
  }

  @action
  async fetch(userId: string): Promise<User> {
    this.isLoading = true;
    try {
      const user = <User>await this.userService.getUser(userId);
      if (!user) return this.current;
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
  async getUser(userId: string): Promise<User | null> {
    this.isLoading = true;
    try {
      return <User>await this.userService.getUser(userId);
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
      return null;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  @action
  async fetchByUsername(username: string): Promise<User> {
    this.isLoading = true;
    try {
      const user = await this.userService.getUserByUsername(username);
      if (!user) return this.current;
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
    return this.current;
  }

  @action
  async createTask(task: TaskDto): Promise<Task[]> {
    this.isLoading = true;
    try {
      const newTask = await this.userService.createTask(
        task,
        this.current as User
      );
      if (!newTask) return this.tasks;
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
  async updateTask(taskId: string, taskDto: TaskDto): Promise<Task[]> {
    try {
      const updatedTask = await this.userService.updateTask(taskDto, taskId);
      if (!updatedTask) return this.tasks;
      runInAction(() => {
        const index = this.tasks.findIndex((task) => task.id === taskId);
        if (index !== -1) this.tasks[index] = updatedTask;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    }
    return this.tasks;
  }

  @action
  async deleteTask(taskId: string): Promise<void> {
    try {
      const result = await this.userService.deleteTask(
        taskId,
        this.current as User
      );
      if (!result) return;
      runInAction(() => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    }
  }

  @action
  async toggleTask(taskId: string): Promise<Task[]> {
    try {
      const task = this.getTaskById(taskId);
      if (!task) return this.tasks;
      const toggledTask = await this.userService.toggleTask(task);
      if (!toggledTask) return this.tasks;
      runInAction(() => {
        const index = this.tasks.findIndex((t) => t.id === taskId);
        if (index !== -1) this.tasks[index] = toggledTask;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    }
    return this.tasks;
  }

  @action
  async loadImportantTasks() {
    this.isLoading = true;
    try {
      const newTasks = await this.userService.getImportantUserTasks(
        this.current.id
      );
      if (!newTasks) return this.tasks;
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

  @action
  async joinTeam(teamId: string): Promise<Team[]> {
    this.isLoading = true;
    try {
      const newTeam = await this.teamService.joinTeam(teamId);
      if (!newTeam) return this.current.teams;
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
  async leaveTeam(teamId: string): Promise<string | null> {
    this.isLoading = true;
    try {
      const result = await this.teamService.leaveTeam(teamId);
      if (!result) return null;
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
  async createTeam(teamDto: TeamDto): Promise<Team[]> {
    this.isLoading = true;
    try {
      const newTeam = await this.teamService.createTeam(teamDto);
      if (!newTeam) return this.current.teams;
      runInAction(() => {
        this.current?.teams.push(newTeam);
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
    return this.current.teams;
  }

  @action
  async update(id: string, updateDto: Partial<User>): Promise<User> {
    this.isLoading = true;
    try {
      const updatedUser = <User>(
        await this.userService.updateUser(id, updateDto)
      );
      if (!updatedUser) return this.current;
      runInAction(() => {
        this.current = updatedUser;
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
    return this.current;
  }

  getActivityById(id: string) {
    return this.current.activities.find((activity) => activity.id === id);
  }

  @action
  async createActivity(
    activityDto: LeisureActivityDto
  ): Promise<LeisureActivity[]> {
    this.isLoading = true;
    try {
      const newActivity = <LeisureActivity>(
        await this.userService.createActivity(activityDto, this.current)
      );
      if (!newActivity) return this.current.activities;
      runInAction(() => {
        this.current?.activities.push(newActivity);
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
    return this.current.activities;
  }

  async updateActivity(
    id: string,
    activityDto: LeisureActivityDto
  ): Promise<LeisureActivity[]> {
    try {
      const updatedActivity = <LeisureActivity>(
        await this.activityService.updateActivity(activityDto, id)
      );
      if (!updatedActivity) return this.current.activities;
      runInAction(() => {
        const index = this.current.activities.findIndex(
          (activity) => activity.id === id
        );
        if (index !== -1) this.current.activities[index] = updatedActivity;
      });
    } catch (error) {
      runInAction(() => {
        this.error = <Error>error;
      });
    }
    return this.current.activities;
  }

  async toggleActivity(taskId: string): Promise<LeisureActivity[]> {
    try {
      const activity = this.getActivityById(taskId);
      if (!activity) throw new Error('Activity not found');
      const toggledActivity = <LeisureActivity>(
        await this.activityService.toggleActivity(activity)
      );
      if (!toggledActivity) return this.current.activities;
      runInAction(() => {
        const index = this.current.activities.findIndex((t) => t.id === taskId);
        if (index !== -1) this.current.activities[index] = toggledActivity;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    }
    return this.current.activities;
  }

  async deleteActivity(id: string): Promise<LeisureActivity[]> {
    try {
      const result = await this.userService.deleteActivity(id, this.current);
      if (!result) return this.current.activities;
      runInAction(() => {
        this.current.activities = this.current.activities.filter(
          (activity) => activity.id !== id
        );
      });
    } catch (error) {
      runInAction(() => {
        this.error = <Error>error;
      });
    }
    return this.current.activities;
  }
}
