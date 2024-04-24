import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async findTasksByProject(projectId: number): Promise<Task[]> {
    return await this.taskRepository.findTasksByProject(projectId);
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    project?: Project,
  ): Promise<Task> {
    if (project) {
      return await this.taskRepository.create(createTaskDto, project);
    }
    return await this.taskRepository.create(createTaskDto);
  }

  async findById(taskId: number): Promise<Task> {
    return await this.taskRepository.findById(taskId);
  }

  async updateTask(
    taskId: number,
    updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    return await this.taskRepository.update(taskId, updateTaskDto);
  }

  async deleteTask(taskId: number): Promise<void> {
    return await this.taskRepository.delete(taskId);
  }
}
