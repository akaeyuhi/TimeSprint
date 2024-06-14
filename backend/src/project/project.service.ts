import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project } from './entities/project.entity';
import { Task } from 'src/task/entities/task.entity';
import { UpdateProjectDto } from 'src/project/dto/update-project.dto';
import { CreateProjectDto } from 'src/project/dto/create-project.dto';
import { AddTasksDto } from 'src/project/dto/add-tasks.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { TaskService } from 'src/task/task.service';
import { Team } from 'src/team/entities/team.entity';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly taskService: TaskService,
  ) {}

  async createProject(projectData: CreateProjectDto): Promise<Project> {
    return await this.projectRepository.create(projectData);
  }

  async updateProject(
    id: string,
    projectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectRepository.update(id, projectDto);
  }

  async deleteProject(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async findProjectById(id: string): Promise<Project> {
    return await this.projectRepository.findById(id);
  }

  async findAllProjects(): Promise<Project[]> {
    return await this.projectRepository.findAll();
  }

  async assignProjectToTeam(id: string, team: Team): Promise<Project> {
    return await this.projectRepository.assignProjectToTeam(id, team);
  }

  async findProjectsByTeam(teamId: string): Promise<Project[]> {
    return await this.projectRepository.findProjectsByTeam(teamId);
  }

  async addTaskToProject(
    projectId: string,
    addTasksDto: AddTasksDto,
  ): Promise<Task[]> {
    const tasksToAdd = [];
    for (const taskId of addTasksDto.ids) {
      const task = await this.taskService.findById(taskId);
      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found`);
      }
      tasksToAdd.push(task);
    }
    await this.projectRepository.addTaskToProject(projectId, ...tasksToAdd);
    return tasksToAdd;
  }

  async createTaskInProject(
    projectId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const project = await this.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    return await this.taskService.createTask(createTaskDto, project);
  }

  async removeTaskFromProject(
    projectId: string,
    taskId: string,
  ): Promise<void> {
    await this.projectRepository.removeTaskFromProject(projectId, taskId);
    await this.taskService.deleteTask(taskId);
  }

  async findTasksByProject(projectId: string): Promise<Task[]> {
    return await this.projectRepository.findTasksByProject(projectId);
  }
}
