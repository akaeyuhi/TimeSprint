import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { IRepository } from 'src/interfaces/repository.interface';

@Injectable()
export class TaskRepository implements IRepository<Task> {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async create(createTaskDto: Partial<Task>, project?: Project): Promise<Task> {
    createTaskDto.project = project ?? null;
    const task = this.repository.create(createTaskDto);
    return await this.repository.save(task);
  }

  async update(id: number, updateTaskDto: Partial<Task>): Promise<Task> {
    const task = await this.findById(id);
    return await this.repository.save({ ...task, ...updateTaskDto });
  }

  async findById(id: number): Promise<Task> {
    const task = await this.repository.findOne({
      where: { id },
      relations: ['dependencies'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async delete(taskId: number): Promise<void> {
    const result = await this.repository.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
  }

  findAll(): Promise<Task[]> {
    return this.repository.find();
  }

  async findAllTaskWithDependencies(): Promise<Task[]> {
    return await this.repository.find({ relations: ['dependencies'] });
  }

  async findTaskDependencies(taskId: number): Promise<Task[]> {
    return (await this.findById(taskId)).dependencies;
  }
}
