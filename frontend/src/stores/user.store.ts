import { action, get, makeAutoObservable, observable } from 'mobx';
import { User } from 'src/models/user.model';
import { CreateTaskDto } from 'src/dto/task/create-task.dto';
import { Task } from 'src/models/task.model';
import { Team } from 'src/models/team.model';
import { UpdateTaskDto } from 'src/dto/task/update-task.dto';
import { CreateTeamDto } from 'src/dto/team/create-team.dto';
import TaskStore from 'src/stores/base.store';


export class UserStore extends TaskStore {
  @observable error: Error | null = null;
  @observable isLoading = false;
  @observable currentUser: User = { id: 8,
    username: 'bob_jones',
    email: 'bob@example.com'
  } as User;
  @observable tasks = [{
    id: 1,
    name: 'Complete project proposal',
    description: 'Prepare and submit the project proposal by the deadline.',
    urgency: true,
    importance: true,
    startDate: new Date('2024-04-19T13:00:00'),
    endDate: new Date('2024-04-19T15:00:00'),
    isCompleted: false,
    dependencies: [] as Task[],
  },
  {
    id: 2,
    name: 'Review meeting notes',
    description: 'Review the notes from yesterday\'s team meeting.',
    urgency: false,
    importance: true,
    startDate: new Date('2024-04-19T15:30:00'),
    endDate: new Date('2024-04-19T16:30:00'),
    isCompleted: false,
    dependencies: [] as Task[],
  },];


  constructor() {
    super();
    makeAutoObservable(this);
  }

  @get
  async getCurrentUser(): Promise<User> {
    return this.currentUser;
  }

  @get
  async fetch(userId = this.currentUser.id): Promise<void> {
    this.isLoading = true;
    this.currentUser = { ...this.currentUser};
    this.tasks = this.currentUser.tasks;
    this.isLoading = false;
  };

  async fetchByUsername(username: string): Promise<void> {
    this.isLoading = true;
    this.currentUser = { ...this.currentUser};
    this.tasks = this.currentUser.tasks;
    this.isLoading = false;
  }

  @get
  getTaskById(taskId: number): Task | null {
    return this.currentUser.tasks.find(task => task.id === taskId) ?? null;
  }

  @get
  getTasks(): Task[] {
    return this.currentUser.tasks;
  }

  @get
  getUserTeamById(teamId: number): Team | null {
    return this.currentUser.teams.find(team => team.id === teamId) ?? null;
  }

  @get
  getUserTeams(): Team[] {
    return this.currentUser.teams;
  }

  @action
  async createTask(task: CreateTaskDto) {
    this.isLoading = true;
    const newTask = { ...task } as Task;
    this.isLoading = false;
    this.currentUser?.tasks.push(newTask);
    return newTask;
  }

  @action
  async updateTask(taskId: number, taskDto: UpdateTaskDto) {
    this.isLoading = true;
    const taskToUpdate = this.getTaskById(taskId);
    Object.assign(taskToUpdate!, taskDto);
    this.isLoading = false;
    return taskToUpdate;
  }

  @action
  async deleteTask(taskId: number) {
    this.isLoading = true;
    const newArray = this.currentUser.tasks.filter(task => task.id !== taskId);
    this.isLoading = false;
    this.currentUser.tasks = newArray;
    return taskId;
  }

  @action
  async assignTeam(team: Team) {
    this.isLoading = true;
    this.currentUser?.teams.push(team);
    this.isLoading = false;
    return team;
  }

  @action
  async leaveTeam(teamId: number) {
    this.isLoading = true;
    this.currentUser.teams = this.currentUser.teams.filter(team => team.id !== teamId);
    this.isLoading = false;
    return teamId;
  }

  @action
  async createTeam(teamDto: CreateTeamDto) {
    this.isLoading = true;
    const newTeam = { ...teamDto } as Team;
    this.currentUser.teams.push(newTeam);
    this.isLoading = false;
    return newTeam;
  }
  // @action
  // async updateTeam(teamId: number, teamDto: UpdateTeamDto) {
  //   this.isLoading = true;
  //   const updated = this.getUserTeamById(teamId)!;
  //   Object.assign(updated, teamDto);
  //   this.isLoading = false;
  //   return updated;
  // }


  @action
  setAuthenticatedUser(user: User) {
    this.currentUser = user;
  }

  @action
  async update(id: number, updateDto: Partial<User>): Promise<User> {
    this.isLoading = true;
    const updatedUser = { ...this.currentUser, ...updateDto };
    this.currentUser = updatedUser as User;
    this.isLoading = false;
    return Promise.resolve(updatedUser as User);
  }
}
