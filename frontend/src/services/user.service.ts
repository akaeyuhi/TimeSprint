import BaseService from './base.service';
import { User } from 'src/models/user.model';
import { UserError } from 'src/services/errors/user.error';
import { RegisterDto } from 'src/services/dto/auth/register.dto';
import { ITaskService } from 'src/services/interfaces/task.service';
import { Task } from 'src/models/task.model';
import { CreateTaskDto } from 'src/services/dto/task/create-task.dto';
import { UpdateTaskDto } from 'src/services/dto/task/update-task.dto';
import { TaskReturn, UserReturn } from 'src/services/types';
import { TaskError } from 'src/services/errors/task.error';

class UserService extends BaseService implements ITaskService<User> {
  async getUser(id: number): Promise<UserReturn> {
    try {
      return await this.httpRequest.get<User>(`/users/${id}`);
    } catch (error) {
      throw new UserError('Error fetching user data');
    }
  }

  async getUserByUsername(username: string): Promise<UserReturn> {
    try {
      return await this.httpRequest.get<User>(`/users/by-username/${username}`);
    } catch (error) {
      throw new UserError('Error fetching user data');
    }
  }

  async getAllUsers(): Promise<User[] | null> {
    try {
      return await this.httpRequest.get<User[]>('/users');
    } catch (error) {
      throw new UserError('Error fetching users data');
    }
  }

  async createUser(createUserDto: RegisterDto): Promise<UserReturn> {
    try {
      return this.httpRequest.post<User>('/users', createUserDto);
    } catch (error) {
      throw new UserError('Error creating user');
    }
  }

  async updateUser(id: number, user: Partial<RegisterDto>): Promise<UserReturn> {
    try {
      return this.httpRequest.put<User>(`/users/${id}`, user);
    } catch (error) {
      throw new UserError('Error updating users data');
    }
  }

  async deleteUser(id: number): Promise<UserReturn> {
    try {
      return this.httpRequest.delete<User>(`/users/${id}`);
    } catch (error) {
      throw new UserError('Error deleting users data');
    }
  }

  async getImportantUserTasks(id: number): Promise<Task[] | null> {
    try {
      return this.httpRequest.get<Task[]>(`/users/${id}/prioritized`);
    } catch (error) {
      throw new TaskError('Error getting prioritized user tasks');
    }
  }

  async getTasks(item: User): Promise<Task[] | null> {
    try {
      return this.httpRequest.get<Task[]>(`/users/${item.id}/tasks`);
    } catch (error) {
      throw new TaskError('Error getting user tasks');
    }
  }

  async getTaskById(id: number): Promise<TaskReturn> {
    try {
      return this.httpRequest.get<Task>(`/tasks/${id}`);
    } catch (error) {
      throw new TaskError('Error getting task');
    }
  }

  async createTask(dto: CreateTaskDto, item: User): Promise<TaskReturn> {
    try {
      return this.httpRequest.post<Task>(`/users/${item.id}/tasks`, dto);
    } catch (error) {
      throw new TaskError('Error creating user task');
    }
  }

  async deleteTask(id: number, item: User): Promise<TaskReturn> {
    try {
      return this.httpRequest.delete<Task>(`/users/${item.id}/tasks/${id}`);
    } catch (error) {
      throw new TaskError('Error deleting user task');
    }
  }

  async updateTask(dto: UpdateTaskDto, taskId: number): Promise<TaskReturn> {
    try {
      return this.httpRequest.patch<Task>(`/tasks/${taskId}`, dto);
    } catch (error) {
      throw new TaskError('Error updating user task');
    }
  }

  async toggleTask(task: Task): Promise<TaskReturn> {
    try {
      return this.httpRequest.patch<Task>(`/tasks/${task.id}`, { isCompleted: !task.isCompleted });
    } catch (error) {
      throw new TaskError('Error toggling user task');
    }
  }
}

export default UserService;
