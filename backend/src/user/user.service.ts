import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findByUsername(username);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findById(id);
    const updatedUser = { ...existingUser, ...updateUserDto };
    return this.userRepository.update(id, updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const existingUser = await this.findById(id);
    await this.userRepository.delete(existingUser.id);
  }

  async findUserWithPassword(email: string) {
    return this.userRepository.getUserWithPassword(email);
  }

  async createUserTask(taskDTO: CreateTaskDto, userId: string): Promise<Task> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const newTask = await this.taskService.createTask(taskDTO);
    return await this.userRepository.assignTaskToUser(user, newTask);
  }

  async deleteUserTask(userId: string, taskId: string): Promise<Task> {
    const user = await this.userRepository.findById(userId);
    const task = await this.taskService.findById(taskId);
    await this.taskService.deleteTask(taskId);
    return await this.userRepository.deleteTaskFromUser(user, task);
  }

  async deleteUserActivity(
    userId: string,
    activityId: string,
  ): Promise<LeisureActivity> {
    const user = await this.userRepository.findById(userId);
    const activity =
      await this.leisureActivityService.findLeisureActivityById(activityId);
    await this.leisureActivityService.deleteLeisureActivity(activityId);
    return await this.userRepository.deleteActivityFromUser(user, activity);
  }

  async addLeisureActivityToUser(
    userId: string,
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
    userId: string,
  ): Promise<LeisureActivity[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user.activities;
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user.tasks;
  }

  async changeUserRole(userId: string, role: AdminRole): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    await this.updateUser(userId, { role });
    return user;
  }

  async getSortedUserTasks(userId: string): Promise<Task[]> {
    const user = await this.findById(userId);
    // Sort tasks by calculated priority in descending order

    return user.tasks.sort(
      (a, b) =>
        this.taskService.calculateTaskPriority(b) -
        this.taskService.calculateTaskPriority(a),
    );
  }
}
