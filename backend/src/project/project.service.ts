import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project } from './entities/project.entity';
import { Task } from 'src/task/entities/task.entity';
import { UpdateProjectDto } from 'src/project/dto/update-project.dto';
import { CreateProjectDto } from 'src/project/dto/create-project.dto';
import { AddTasksDto } from 'src/project/dto/add-tasks.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { TaskService } from 'src/task/task.service';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly taskService: TaskService,
    private readonly teamService: TeamService,
  ) {}

  async createProject(projectData: CreateProjectDto): Promise<Project> {
    return await this.projectRepository.create(projectData);
  }

  async updateProject(
    id: number,
    projectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectRepository.update(id, projectDto);
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async findProjectById(id: number): Promise<Project> {
    return await this.projectRepository.findById(id);
  }

  async findAllProjects(): Promise<Project[]> {
    return await this.projectRepository.findAll();
  }

  async assignProjectToTeam(id: number, teamId: number): Promise<Project> {
    const team = await this.teamService.findById(teamId);
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }
    return await this.projectRepository.assignProjectToTeam(id, team);
  }

  async findProjectsByTeam(teamId: number): Promise<Project[]> {
    return await this.projectRepository.findProjectsByTeam(teamId);
  }

  async addTaskToProject(
    projectId: number,
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
    projectId: number,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskDto, projectId);
  }

  async removeTaskFromProject(
    projectId: number,
    taskId: number,
  ): Promise<void> {
    await this.projectRepository.removeTaskFromProject(projectId, taskId);
    await this.taskService.deleteTask(taskId);
  }

  async findTasksByProject(projectId: number): Promise<Task[]> {
    return await this.projectRepository.findTasksByProject(projectId);
  }
}
