import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { IRepository } from 'src/interfaces/repository.interface';
import { LeisureActivity } from 'src/leisure-activity/entities/leisure-activity.entity';

@Injectable()
export class UserRepository implements IRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find({
      relations: {
        teams: true,
        activities: true,
        tasks: {
          dependencies: true,
        },
      },
    });
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne({
      where: { id },
      relations: {
        teams: true,
        activities: true,
        tasks: {
          dependencies: true,
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }

  async findByUsername(username: string): Promise<User> {
    return this.repository.findOneBy({ username });
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.repository.create(userData);
    return this.repository.save(newUser);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.repository.save({ ...user, ...userData });
  }

  async delete(id: string): Promise<void> {
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

  async deleteActivityFromUser(
    user: User,
    activity: LeisureActivity,
  ): Promise<LeisureActivity> {
    user.activities = user.activities.filter(
      userActivity => userActivity.id !== activity.id,
    );
    await this.repository.save(user);
    return activity;
  }
}
