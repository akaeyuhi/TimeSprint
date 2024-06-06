import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Project } from 'src/models/project.model';
import { UpdateProjectDto } from 'src/services/dto/project/update-project.dto';
import { UpdateTaskDto } from 'src/services/dto/task/update-task.dto';
import { Task } from 'src/models/task.model';
import { CreateTaskDto } from 'src/services/dto/task/create-task.dto';
import TaskStore from 'src/stores/task.store';
import ProjectService from 'src/services/project.service';

export class ProjectStore extends TaskStore<Project> {
  @observable error: Error | null = null;
  @observable isLoading = false;
  @observable.deep current: Project = {} as Project;
  @observable.deep tasks: Task[] = [];
  projectService: ProjectService;

  constructor(projectService: ProjectService) {
    super();
    this.projectService = projectService;
    makeObservable(this);
  }

  @computed
  get progress(): number {
    const totalTasks = this.current.tasks.length;
    if (totalTasks === 0) return 0; // Avoid division by zero
    const completedTasks = this.current.tasks.filter(task => task.isCompleted).length;
    return (completedTasks / totalTasks) * 100;
  }

  getTasks() {
    return this.current?.tasks || [];
  }

  @action
  async fetch(projectId: number) {
    this.isLoading = true;
    try {
      const project = <Project> await this.projectService.getProject(projectId);
      runInAction(() => {
        this.current = project;
        this.tasks = project.tasks;
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

  getTaskById(taskId: number): Task | null {
    return this.current?.tasks.find(task => task.id === taskId) ?? null;
  }

  @action
  async createTask(taskDto: CreateTaskDto): Promise<Task> {
    this.isLoading = true;
    try {
      const newTask = <Task> await this.projectService.createTask(taskDto, this.current as Project);
      runInAction(() => {
        this.current?.tasks.push(newTask);
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
  async updateTask(taskId: number, taskDto: UpdateTaskDto) {
    this.isLoading = true;
    try {
      const updatedTask = <Task> await this.projectService.updateTask(taskDto, taskId);
      runInAction(() => {
        const taskIndex = this.current?.tasks.findIndex(task => task.id === taskId);
        if (this.current && taskIndex && taskIndex >= 0) {
          this.current.tasks[taskIndex] = updatedTask;
          this.tasks = this.current?.tasks;
        }
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
  async deleteTask(taskId: number) {
    if (!this.current) return;
    this.isLoading = true;
    try {
      await this.projectService.deleteTask(taskId, this.current);
      runInAction(() => {
        if (this.current) {
          this.current.tasks = this.current.tasks.filter(task => task.id !== taskId);
          this.tasks = this.current.tasks;
          this.isLoading = false;
        }
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
  async editProject(projectDto: UpdateProjectDto) {
    this.isLoading = true;
    try {
      const updatedProject = <Project> await this.projectService.updateProjects(
        this.current.id,
        projectDto,
      );
      runInAction(() => {
        this.current = updatedProject;
        this.isLoading = false;
      });
      return updatedProject;
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
        this.isLoading = false;
      });
    }
  }

  @action
  async toggleTask(taskId: number): Promise<Task | null> {
    try {
      const task = this.getTaskById(taskId);
      if (task) {
        const toggledTask = await this.projectService.toggleTask(task);
        runInAction(() => {
          const taskIndex = this.current?.tasks.findIndex(t => t.id === taskId);
          if (this.current && taskIndex && taskIndex >= 0) {
            if (toggledTask) {
              this.current.tasks[taskIndex] = toggledTask;
            }
            this.tasks = this.current.tasks;
          }
        });
        return toggledTask;
      }
      return null;
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
      return null;
    }
  }

  @action
  sortTasks(sorted: Task[]) {
    this.tasks = sorted;
  }
}
