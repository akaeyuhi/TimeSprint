import { action, makeObservable, observable } from 'mobx';
import { User } from 'src/models/user.model';
import { CreateTaskDto } from 'src/services/dto/task/create-task.dto';
import { Task } from 'src/models/task.model';
import { Team } from 'src/models/team.model';
import { UpdateTaskDto } from 'src/services/dto/task/update-task.dto';
import { CreateTeamDto } from 'src/services/dto/team/create-team.dto';
import TaskStore from 'src/stores/task.store';


export class UserStore extends TaskStore<User> {
  @observable error: Error | null = null;
  @observable isLoading = false;
  @observable.deep current: User = {
    id: 8,
    username: 'bob_jones',
    email: 'bob@example.com',
    teams: [
      {
        id: 1,
        name: 'Team 1',
        description: 'Description for Team 1',
        admins: [
          { id: 3, username: 'alice_smith', email: 'alice@example.com' } as User,
          { id: 4, username: 'bob_jones', email: 'bob@example.com' } as User,
          { id: 5, username: 'alice_smith', email: 'alice@example.com' } as User,
          { id: 6, username: 'bob_jones', email: 'bob@example.com' } as User,
          { id: 7, username: 'alice_smith', email: 'alice@example.com' } as User,
          { id: 8, username: 'bob_jones', email: 'bob@example.com' } as User,
        ],
        members: [
          { id: 3, username: 'alice_smith', email: 'alice@example.com' } as User,
          { id: 4, username: 'bob_jones', email: 'bob@example.com' } as User,
          { id: 5, username: 'alice_smith', email: 'alice@example.com' } as User,
          { id: 6, username: 'bob_jones', email: 'bob@example.com' } as User,
          { id: 7, username: 'alice_smith', email: 'alice@example.com' } as User,
          { id: 8, username: 'bob_jones', email: 'bob@example.com' } as User,
        ],
        projects: [
          {
            id: 1,
            name: 'Project 1',
            description: 'Description for Project 1',
            startDate: new Date(),
            endDate: new Date('2024-05-15'),
            isCompleted: false,
            tasks: [],
          },
          {
            id: 2,
            name: 'Project 2',
            description: 'Description for Project 2',
            startDate: new Date(),
            endDate: new Date('2024-06-30'),
            isCompleted: true,
            tasks: [],
          },
        ],
      },
    ],
  } as unknown as User;
  @observable.deep tasks = [{
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
  }];


  constructor() {
    super();
    makeObservable(this);
  }

  async getCurrentUser(): Promise<User> {
    return this.current;
  }

  @action
  async fetch(userId = this.current.id): Promise<void> {
    this.isLoading = true;
    this.current = { ...this.current };
    this.isLoading = false;
  };

  @action
  async fetchByUsername(username: string): Promise<void> {
    this.isLoading = true;
    this.current = { ...this.current };
    this.isLoading = false;
  }

  getTaskById(taskId: number): Task | null {
    return this.tasks.find(task => task.id === taskId) ?? null;
  }

  getTasks(): Task[] {
    return this.current.tasks;
  }

  getUserTeamById(teamId: number): Team | null {
    return this.current.teams.find(team => team.id === teamId) ?? null;
  }

  getUserTeams(): Team[] {
    return this.current.teams;
  }

  @action
  async createTask(task: CreateTaskDto) {
    this.isLoading = true;
    const newTask = { ...task } as Task;
    this.isLoading = false;
    this.tasks.push(newTask);
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
    const newArray = this.tasks.filter(task => task.id !== taskId);
    this.isLoading = false;
    this.tasks = newArray;
    return taskId;
  }

  @action
  async assignTeam(team: Team) {
    this.isLoading = true;
    this.current?.teams.push(team);
    this.isLoading = false;
    return team;
  }

  @action
  async leaveTeam(teamId: number) {
    this.isLoading = true;
    this.current.teams = this.current.teams.filter(team => team.id !== teamId);
    this.isLoading = false;
    return teamId;
  }

  @action
  async createTeam(teamDto: CreateTeamDto) {
    this.isLoading = true;
    const newTeam = { ...teamDto,
      members: [],
      admins: [],
      projects: [],
      id: 999
    } as unknown as Team;
    this.current.teams.push(newTeam);
    this.isLoading = false;
    return newTeam;
  }

  // async updateTeam(teamId: number, teamDto: UpdateTeamDto) {
  //   this.isLoading = true;
  //   const updated = this.getUserTeamById(teamId)!;
  //   Object.assign(updated, teamDto);
  //   this.isLoading = false;
  //   return updated;
  // }

  @action
  async update(id: number, updateDto: Partial<User>): Promise<User> {
    this.isLoading = true;
    const updatedUser = { ...this.current, ...updateDto };
    this.current = updatedUser as User;
    this.isLoading = false;
    return Promise.resolve(updatedUser as User);
  }

  @action
  async toggleTask(taskId: number): Promise<Task | null> {
    const task = this.getTaskById(taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;
    }
    return task;
  }

  @action
  sortTasks(sorted: Task[]) {
    this.tasks = sorted;
  }
}
