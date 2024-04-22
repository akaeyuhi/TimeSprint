import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async findTasksByProject(id: number): Promise<Task[]> {
    return await this.repository.findBy({ id });
  }

  async createTask(
    createTaskDto: Partial<Task>,
    project?: Project,
  ): Promise<Task> {
    const { name, description, urgency, importance, startDate, endDate } =
      createTaskDto;
    const task = new Task();
    task.name = name;
    task.description = description;
    task.urgency = urgency;
    task.importance = importance;
    task.startDate = startDate;
    task.endDate = endDate;
    task.project = project ?? null;

    return await this.repository.save(task);
  }

  async updateTask(id: number, updateTaskDto: Partial<Task>): Promise<Task> {
    const task = await this.repository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    Object.assign(task, updateTaskDto);
    return await this.repository.save(task);
  }

  async findById(id: number): Promise<Task> {
    const task = await this.repository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async deleteTask(taskId: number): Promise<void> {
    const result = await this.repository.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
  }
}
