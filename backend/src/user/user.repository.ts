import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { IRepository } from 'src/interfaces/repository.interface';

@Injectable()
export class UserRepository implements IRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.repository.create(userData);
    return this.repository.save(newUser);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Team not found');
    }
    await this.repository.update(id, userData);
    return user;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async getUserWithPassword(email: string): Promise<User> {
    return this.repository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.id')
      .addSelect('user.password')
      .addSelect('user.username')
      .addSelect('user.email')
      .addSelect('user.role')
      .where('user.email = :email', { email })
      .getOne();
  }

  async assignTaskToUser(user: User, task: Task): Promise<Task> {
    user.tasks.push(task);
    await this.repository.save(user);
    return task;
  }

  async deleteTaskFromUser(user: User, task: Task): Promise<Task> {
    user.tasks = user.tasks.filter(userTask => userTask.id !== task.id);
    await this.repository.save(user);
    return task;
  }
}
