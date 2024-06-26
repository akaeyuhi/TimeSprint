import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { Project } from 'src/models/project.model';
import { Task } from 'src/models/task.model';
import { TaskDto } from 'src/services/dto/task.dto';
import TaskStore from 'src/stores/task.store';
import ProjectService from 'src/services/project.service';
import { ProjectDto } from 'src/services/dto/project.dto';

export class ProjectStore extends TaskStore<Project> {
  @observable error: Error | null = null;
  @observable isLoading = false;
  @observable.deep current: Project = {} as Project;
  @observable.deep tasks: Task[] = [] as Task[];

  constructor(private readonly projectService: ProjectService) {
    super();
    makeObservable(this);
  }

  @computed
  get progress(): number {
    const totalTasks = this.current.tasks.length;
    if (totalTasks === 0) return 100; // Avoid division by zero
    const completedTasks = this.current.tasks.filter(
      (task) => task.isCompleted
    ).length;
    return (completedTasks / totalTasks) * 100;
  }

  @action
  async fetch(projectId: string) {
    this.isLoading = true;
    try {
      const project = await this.projectService.getProject(projectId);
      if (!project) return this.current;
      runInAction(() => {
        this.current = project;
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

  isUserMember(userId: string) {
    if (this.current.team) {
      return this.current.team.members.some((user) => user.id === userId);
    } else return false;
  }

  isUserAdmin(userId: string) {
    if (this.current.team && this.isUserMember(userId)) {
      return this.current.team.admins.some((user) => user.id === userId);
    } else return false;
  }

  @action
  async createTask(taskDto: TaskDto): Promise<Task[]> {
    this.isLoading = true;
    try {
      const newTask = await this.projectService.createTask(
        taskDto,
        this.current as Project
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
  async updateTask(taskId: string, taskDto: TaskDto) {
    try {
      const updatedTask = await this.projectService.updateTask(taskId, taskDto);
      if (!updatedTask) return this.tasks;
      runInAction(() => {
        const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex >= 0) {
          this.tasks[taskIndex] = updatedTask;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    }
    return this.tasks;
  }

  @action
  async deleteTask(taskId: string) {
    if (!this.current) return;
    try {
      const result = await this.projectService.deleteTask(taskId, this.current);
      if (!result) return;
      runInAction(() => {
        if (this.current) {
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    }
  }

  @action
  async editProject(projectDto: ProjectDto) {
    this.isLoading = true;
    try {
      const updatedProject = await this.projectService.updateProject(
        this.current.id,
        projectDto
      );
      if (!updatedProject) return this.current;
      runInAction(() => {
        this.current = updatedProject;
      });
      return updatedProject;
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  @action
  async toggleTask(taskId: string): Promise<Task[]> {
    try {
      const task = this.getTaskById(taskId);
      if (!task) return this.tasks;
      const toggledTask = await this.projectService.toggleTask(task);
      if (!toggledTask) return this.tasks;
      runInAction(() => {
        const index = this.tasks.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          this.tasks[index] = toggledTask;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    }
    return this.tasks;
  }
}
