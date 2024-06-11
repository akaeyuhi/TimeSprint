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

  constructor(private readonly projectService: ProjectService) {
    super();
    makeObservable(this);
  }

  @computed
  get progress(): number {
    const totalTasks = this.current.tasks.length;
    if (totalTasks === 0) return 100; // Avoid division by zero
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

  getTaskById(taskId: number): Task | null {
    return this.current?.tasks.find(task => task.id === taskId) ?? null;
  }

  isUserMember(userId: number) {
    if (this.current.team) {
      return this.current.team.members.some((user) => user.id === userId);
    } else return false;
  }

  isUserAdmin(userId: number) {
    if (this.current.team && this.isUserMember(userId)) {
      return this.current.team.admins.some((user) => user.id === userId);
    } else return false;
  }

  @action
  async createTask(taskDto: CreateTaskDto): Promise<Task[]> {
    this.isLoading = true;
    try {
      const newTask = <Task> await this.projectService.createTask(taskDto, this.current as Project);
      runInAction(() => {
        this.current.tasks.push(newTask);
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
    return this.current.tasks;
  }

  @action
  async updateTask(taskId: number, taskDto: UpdateTaskDto) {
    this.isLoading = true;
    try {
      const updatedTask = <Task> await this.projectService.updateTask(taskDto, taskId);
      runInAction(() => {
        const taskIndex = this.current.tasks.findIndex(task => task.id === taskId);
        if (taskIndex >= 0) {
          this.current.tasks[taskIndex] = updatedTask;
        }
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
    return this.current.tasks;
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
        }
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
  async toggleTask(taskId: number): Promise<Task[]> {
    try {
      const task = this.getTaskById(taskId);
      if (!task) throw new Error('Task not found');
      const toggledTask = <Task> await this.projectService.toggleTask(task);
      runInAction(() => {
        const index = this.current.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
          this.current.tasks[index] = toggledTask;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    }
    return this.current.tasks;
  }

  @action
  sortTasks(sorted: Task[]) {
    this.current.tasks = sorted;
    console.log('set');
  }
}
