import { action, get, makeAutoObservable, observable } from 'mobx';
import { Project } from 'src/models/project.model';
import { User } from 'src/models/user.model';
import { AdminRole } from 'src/models/roles.enum';
import { UpdateProjectDto } from 'src/dto/project/update-project.dto';
import { UpdateTaskDto } from 'src/dto/task/update-task.dto';
import { Task } from 'src/models/task.model';
import { CreateTaskDto } from 'src/dto/task/create-task.dto';
import TaskStore from 'src/stores/base.store';

export class ProjectStore extends TaskStore {
  @observable error = null;
  @observable isLoading = false;
  @observable currentProject: Project = {
    id: 1,
    name: 'Project 1',
    description: 'Description for Project 1',
    startDate: new Date(),
    endDate: new Date('2024-05-15'),
    isCompleted: false,
    tasks: [
      {
        id: 1,
        name: 'Task 1',
        description: 'Description for Task 1',
        urgency: true,
        importance: false,
        startDate: new Date('2024-04-20'),
        endDate: new Date('2024-04-25'),
        isCompleted: false,
        dependencies: [],
        user: {
          id: 1,
          username: 'user1',
          email: 'user1@example.com',
          role: 'USER',
        } as unknown as User,
      },
      {
        id: 2,
        name: 'Task 2',
        description: 'Description for Task 2',
        urgency: false,
        importance: true,
        startDate: new Date('2024-04-22'),
        endDate: new Date('2024-04-27'),
        isCompleted: false,
        dependencies: [],
        user: {
          id: 2,
          username: 'user2',
          email: 'user2@example.com',
          role: 'USER',
        } as unknown as User,
      },
      {
        id: 3,
        name: 'Task 3',
        description: 'Description for Task 3',
        urgency: true,
        importance: true,
        startDate: new Date('2024-04-23'),
        endDate: new Date('2024-04-28'),
        isCompleted: false,
        dependencies: [],
        user: {
          id: 3,
          username: 'user3',
          email: 'user3@example.com',
          role: 'USER',
        } as unknown as User,
      },
      {
        id: 4,
        name: 'Task 4',
        description: 'Description for Task 4',
        urgency: false,
        importance: false,
        startDate: new Date('2024-04-24'),
        endDate: new Date('2024-04-29'),
        isCompleted: false,
        dependencies: [],
        user: {
          id: 4,
          username: 'user4',
          email: 'user4@example.com',
          role: AdminRole.USER,
        } as User,
      },
      {
        id: 5,
        name: 'Task 5',
        description: 'Description for Task 5',
        urgency: true,
        importance: false,
        startDate: new Date('2024-04-25'),
        endDate: new Date('2024-04-30'),
        isCompleted: false,
        dependencies: [],
        user: {
          id: 5,
          username: 'user5',
          email: 'user5@example.com',
          role: AdminRole.USER,
        } as User,
      },
    ],
  };
  @observable tasks = [] as Task[];

  constructor() {
    super();
    makeAutoObservable(this);
  }

  @get
  getTasks() {
    return this.currentProject.tasks;
  }

  @get
  async fetch(projectId: number) {
    this.currentProject = { ...this.currentProject };
    this.tasks = this.currentProject.tasks;
  }

  @get
  getTaskById(taskId: number): Task | null {
    return this.currentProject.tasks.find(task => task.id === taskId) ?? null;
  }

  @action
  async createTask(task: CreateTaskDto) {
    this.isLoading = true;
    const newTask = { ...task } as Task;
    this.isLoading = false;
    this.currentProject.tasks.push(newTask);
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
    const newArray = this.currentProject.tasks.filter(task => task.id !== taskId);
    this.isLoading = false;
    this.currentProject.tasks = newArray;
    return taskId;
  }

  @action
  async editProject(projectDto: UpdateProjectDto) {
    this.isLoading = true;
    Object.assign(this.currentProject, projectDto);
    this.isLoading = false;
    return this.currentProject;
  }
}
