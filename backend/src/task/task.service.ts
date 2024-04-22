import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { ProjectService } from 'src/project/project.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  async findTasksByProject(projectId: number): Promise<Task[]> {
    return await this.taskRepository.findTasksByProject(projectId);
  }

  async createTask(
    projectId: number,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const project = await this.projectService.findProjectById(projectId);
    return await this.taskRepository.createTask(project, createTaskDto);
  }

  async findById(taskId: number): Promise<Task> {
    return await this.taskRepository.findById(taskId);
  }

  async updateTask(
    taskId: number,
    updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    return await this.taskRepository.updateTask(taskId, updateTaskDto);
  }

  async deleteTask(taskId: number): Promise<void> {
    return await this.taskRepository.deleteTask(taskId);
  }
}
