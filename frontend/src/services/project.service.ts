import BaseService from './base.service';
import { ProjectReturn, TaskReturn } from 'src/services/types';
import { TeamError } from 'src/services/errors/team.error';
import { ProjectError } from 'src/services/errors/project.error';
import { ITaskService } from 'src/services/interfaces/task.service';
import { Project } from 'src/models/project.model';
import { Task } from 'src/models/task.model';
import { TaskError } from 'src/services/errors/task.error';
import { TaskDto } from 'src/services/dto/task/task.dto';
import { UpdateProjectDto } from 'src/services/dto/project/update-project.dto';

class ProjectService extends BaseService implements ITaskService<Project> {
  async getProject(id: number): Promise<ProjectReturn> {
    try {
      return await this.httpRequest.get<Project>(`/projects/${id}`);
    } catch (error) {
      throw new ProjectError('Error fetching project data');
    }
  }

  async getAllProjects(): Promise<Project[] | null> {
    try {
      return await this.httpRequest.get<Project[]>('/projects');
    } catch (error) {
      throw new ProjectError('Error fetching project data');
    }
  }

  async updateProjects(id: number, projectDto: UpdateProjectDto): Promise<ProjectReturn> {
    try {
      return this.httpRequest.put<Project>(`/projects/${id}`, projectDto);
    } catch (error) {
      throw new ProjectError('Error updating project data');
    }
  }

  async deleteProject(id: number): Promise<ProjectReturn> {
    try {
      return this.httpRequest.delete<Project>(`/projects/${id}`);
    } catch (error) {
      throw new TeamError('Error deleting project data');
    }
  }

  async getTasks(item: Project): Promise<Task[] | null> {
    try {
      return this.httpRequest.get<Task[]>(`/projects/${item.id}/tasks`);
    } catch (error) {
      throw new TaskError('Error getting user tasks');
    }
  }

  async getTaskById(id: number): Promise<TaskReturn> {
    try {
      return this.httpRequest.get<Task>(`/tasks/${id}`);
    } catch (error) {
      throw new TaskError('Error getting task');
    }
  }

  async createTask(dto: TaskDto, item: Project): Promise<TaskReturn> {
    try {
      return this.httpRequest.post<Task>(`/projects/${item.id}/tasks`, dto);
    } catch (error) {
      throw new TaskError('Error creating user task');
    }
  }

  async deleteTask(id: number, item: Project): Promise<TaskReturn> {
    try {
      return this.httpRequest.delete<Task>(`/projects/${item.id}/tasks/${id}`);
    } catch (error) {
      throw new TaskError('Error deleting user task');
    }
  }

  async updateTask(dto: TaskDto, taskId: number): Promise<TaskReturn> {
    try {
      return this.httpRequest.patch<Task>(`/tasks/${taskId}`, dto);
    } catch (error) {
      throw new TaskError('Error updating user task');
    }
  }

  async toggleTask(task: Task): Promise<TaskReturn> {
    try {
      return this.httpRequest.patch<Task>(`/tasks/${task.id}`, { isCompleted: !task.isCompleted });
    } catch (error) {
      throw new TaskError('Error toggling user task');
    }
  }
}

export default ProjectService;
