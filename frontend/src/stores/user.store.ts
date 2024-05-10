import { action, get, makeObservable, observable } from 'mobx';
import { User } from 'src/models/user.model';
import { CreateTaskDto } from 'src/dto/task/create-task.dto';
import { Task } from 'src/models/task.model';
import { Team } from 'src/models/team.model';
import { UpdateTaskDto } from 'src/dto/task/update-task.dto';


export class UserStore {
  @observable error: Error | null = null;
  @observable isLoading = false;
  @observable authenticatedUser: User = { id: 8,
    username: 'bob_jones',
    email: 'bob@example.com'
  } as User;


  constructor() {
    makeObservable(this);
  }

  @get
  async getCurrentUser(): Promise<User> {
    return this.authenticatedUser;
  }

  @get
  async fetchUser(userId = this.authenticatedUser.id): Promise<User> {
    this.isLoading = true;
    this.authenticatedUser = { id: 8,
      username: 'bob_jones',
      email: 'bob@example.com'
    } as User;
    this.isLoading = false;
    return this.authenticatedUser;
  };

  @get
  getUserTaskById(taskId: number): Task | null {
    return this.authenticatedUser.tasks.find(task => task.id === taskId) ?? null;
  }

  @get
  getUserTasks(): Task[] {
    return this.authenticatedUser.tasks;
  }

  @get
  getUserTeams(): Team[] {
    return this.authenticatedUser.teams;
  }

  @action
  async createTask(task: CreateTaskDto) {
    this.isLoading = true;
    const newTask = { ...task } as Task;
    this.isLoading = false;
    this.authenticatedUser?.tasks.push(newTask);
    return newTask;
  }

  @action
  async updateTask(taskId: number, taskDto: UpdateTaskDto) {
    this.isLoading = true;
    const taskToUpdate = this.getUserTaskById(taskId);
    Object.assign(taskToUpdate!, taskDto);
    this.isLoading = false;
    return taskToUpdate;
  }

  @action
  async deleteTask(taskId: number) {
    this.isLoading = true;
    const newArray = this.authenticatedUser.tasks.filter(task => task.id !== taskId);
    this.isLoading = false;
    this.authenticatedUser.tasks = newArray;
    return taskId;
  }

  @action
  async assignTeam(team: Team) {
    this.isLoading = true;
    this.authenticatedUser?.teams.push(team);
    this.isLoading = false;
    return team;
  }

  @action
  async leaveTeam(teamId: number) {
    this.isLoading = true;
    this.authenticatedUser.teams = this.authenticatedUser.teams.filter(team => team.id !== teamId);
    this.isLoading = false;
    return teamId;
  }

  @action
  setAuthenticatedUser(user: User) {
    this.authenticatedUser = user;
  }

  @action
  async update(id: number, updateDto: Partial<User>): Promise<User> {
    this.isLoading = true;
    const updatedUser = { ...this.authenticatedUser, ...updateDto };
    this.authenticatedUser = updatedUser as User;
    this.isLoading = false;
    return Promise.resolve(updatedUser as User);
  }
}
