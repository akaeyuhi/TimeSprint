import { Return } from 'src/services/types';
import { TeamError } from 'src/services/errors/team.error';
import { ProjectError } from 'src/services/errors/project.error';
import { Project } from 'src/models/project.model';
import { Task } from 'src/models/task.model';
import { TaskError } from 'src/services/errors/task.error';
import { TaskDto } from 'src/services/dto/task.dto';
import { TaskService } from 'src/services/task.service';
import { ProjectDto } from 'src/services/dto/project.dto';

class ProjectService extends TaskService<Project> {
  async getProject(id: string): Promise<Return<Project>> {
    try {
      return await this.httpRequest.get<Project>(`/projects/${id}`);
    } catch (error) {
      throw new ProjectError('Error fetching project data');
    }
  }

  async getAllProjects(): Promise<Return<Project[]>> {
    try {
      return await this.httpRequest.get<Project[]>('/projects');
    } catch (error) {
      throw new ProjectError('Error fetching project data');
    }
  }

  async updateProject(
    id: string,
    projectDto: ProjectDto
  ): Promise<Return<Project>> {
    try {
      return this.httpRequest.put<Project>(`/projects/${id}`, projectDto);
    } catch (error) {
      throw new ProjectError('Error updating project data');
    }
  }

  async deleteProject(id: string): Promise<Return<Project>> {
    try {
      return this.httpRequest.delete<Project>(`/projects/${id}`);
    } catch (error) {
      throw new TeamError('Error deleting project data');
    }
  }

  async createTask(dto: TaskDto, item: Project): Promise<Return<Task>> {
    try {
      return this.httpRequest.post<Task>(`/projects/${item.id}/tasks`, dto);
    } catch (error) {
      throw new TaskError('Error creating user task');
    }
  }

  async deleteTask(id: string, item: Project): Promise<Return<Task>> {
    try {
      return this.httpRequest.delete<Task>(`/projects/${item.id}/tasks/${id}`);
    } catch (error) {
      throw new TaskError('Error deleting user task');
    }
  }
}

export default ProjectService;
