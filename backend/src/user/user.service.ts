import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entities/user.entity';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { TaskService } from 'src/task/task.service';
import { Task } from 'src/task/entities/task.entity';
import { LeisureActivity } from 'src/leisure-activity/entities/leisure-activity.entity';
import { LeisureActivityService } from 'src/leisure-activity/leisure-activity.service';
import { CreateLeisureActivityDto } from 'src/leisure-activity/dto/create-leisure-activity.dto';
import { AdminRole } from 'src/user/utils';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly taskService: TaskService,
    private readonly leisureActivityService: LeisureActivityService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userCheck = this.userRepository.findByEmail(createUserDto.email);
    if (userCheck) {
      throw new ConflictException('User with such email already exists');
    }
    return this.userRepository.create(createUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = { ...existingUser, ...updateUserDto };
    return this.userRepository.update(id, updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(existingUser.id);
  }

  async findUserWithPassword(email: string) {
    return this.userRepository.getUserWithPassword(email);
  }

  async createUserTask(taskDTO: CreateTaskDto, userId: number): Promise<Task> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const newTask = await this.taskService.createTask(taskDTO);
    return await this.userRepository.assignTaskToUser(user, newTask);
  }

  async deleteUserTask(userId: number, taskId: number): Promise<Task> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const task = await this.taskService.findById(taskId);
    return await this.userRepository.deleteTaskFromUser(user, task);
  }

  async addLeisureActivityToUser(
    userId: number,
    activityDto: CreateLeisureActivityDto,
  ): Promise<LeisureActivity> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return await this.leisureActivityService.createLeisureActivity({
      ...activityDto,
      user,
    });
  }

  async getLeisureActivitiesForUser(
    userId: number,
  ): Promise<LeisureActivity[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user.activities;
  }

  async changeUserRole(userId: number, role: AdminRole): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    await this.updateUser(userId, { role });
    return user;
  }

  async getSortedUserTasks(userId: number): Promise<Task[]> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    // Sort tasks by calculated priority in descending order
    return user.tasks.sort(
      (a, b) =>
        this.taskService.calculateTaskPriority(a) -
        this.taskService.calculateTaskPriority(b),
    );
  }
}
