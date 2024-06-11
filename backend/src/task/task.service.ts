import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Project } from 'src/project/entities/project.entity';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

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
    updateTaskDto: Partial<UpdateTaskDto>,
  ): Promise<Task> {
    return await this.taskRepository.update(taskId, updateTaskDto);
  }

  async deleteTask(taskId: number): Promise<void> {
    return await this.taskRepository.delete(taskId);
  }

  async findAllTaskWithDependencies(): Promise<Task[]> {
    return await this.taskRepository.findAllTaskWithDependencies();
  }

  async findTaskDependencies(taskId: number): Promise<Task[]> {
    return await this.taskRepository.findTaskDependencies(taskId);
  }

  calculateTaskPriority(task: Task): number {
    let priority = 0;

    // Work-related tasks have higher priority than leisure tasks
    if (task.project) {
      priority += 2; // Adjust priority as needed
    }

    // Tasks with approaching deadlines have higher priority
    const currentDate = new Date();
    if (task.endDate && task.endDate.getTime() < currentDate.getTime()) {
      const timeDifference = task.endDate.getTime() - currentDate.getTime();
      const daysUntilDeadline = Math.ceil(timeDifference / (1000 * 3600 * 24));
      // Adjust priority based on days until deadline
      priority += daysUntilDeadline;
    }

    // Urgent and important tasks have higher priority
    if (task.urgency && task.importance) {
      priority += 3; // Quadrant 1: Urgent and Important
    } else if (task.urgency && !task.importance) {
      priority += 2; // Quadrant 3: Urgent, but Not Important
    } else if (!task.urgency && task.importance) {
      priority += 1; // Quadrant 2: Important, but Not Urgent
    }

    return priority;
  }
}
