import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { TaskRepository } from '../task/task.repository';
import { Project } from './entities/project.entity';
import { Task } from 'src/task/entities/task.entity';
import { UpdateProjectDto } from 'src/project/dto/update-project.dto';
import { TeamRepository } from 'src/team/team.repository';
import { CreateProjectDto } from 'src/project/dto/create-project.dto';
import { AddTasksDto } from 'src/project/dto/add-tasks.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly taskRepository: TaskRepository,
    private readonly teamRepository: TeamRepository,
  ) {}

  async createProject(projectData: CreateProjectDto): Promise<Project> {
    return await this.projectRepository.createProject(projectData);
  }

  async updateProject(
    id: number,
    projectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectRepository.updateProject(id, projectDto);
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.deleteProject(id);
  }

  async findProjectById(id: number): Promise<Project> {
    return await this.projectRepository.findProjectById(id);
  }

  async findAllProjects(): Promise<Project[]> {
    return await this.projectRepository.findAllProjects();
  }

  async assignProjectToTeam(id: number, teamId: number): Promise<Project> {
    const team = await this.teamRepository.findById(teamId);
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
      const task = await this.taskRepository.findById(taskId);
      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found`);
      }
      tasksToAdd.push(task);
    }
    await this.projectRepository.addTaskToProject(projectId, ...tasksToAdd);
    return tasksToAdd;
  }

  async removeTaskFromProject(
    projectId: number,
    taskId: number,
  ): Promise<void> {
    return await this.projectRepository.removeTaskFromProject(
      projectId,
      taskId,
    );
  }

  async findTasksByProject(projectId: number): Promise<Task[]> {
    return await this.projectRepository.findTasksByProject(projectId);
  }
}
