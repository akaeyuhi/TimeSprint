import { User } from 'src/models/user.model';
import { UserError } from 'src/services/errors/user.error';
import { RegisterDto } from 'src/services/dto/register.dto';
import { Task } from 'src/models/task.model';
import { TaskDto } from 'src/services/dto/task.dto';
import { Return } from 'src/services/types';
import { TaskError } from 'src/services/errors/task.error';
import { TaskService } from 'src/services/task.service';

class UserService extends TaskService<User> {
  async getUser(id: number): Promise<Return<User>> {
    try {
      return await this.httpRequest.get<User>(`/users/${id}`);
    } catch (error) {
      throw new UserError('Error fetching user data');
    }
  }

  async getUserByUsername(username: string): Promise<Return<User>> {
    try {
      return await this.httpRequest.get<User>(`/users/by-username/${username}`);
    } catch (error) {
      throw new UserError('Error fetching user data');
    }
  }

  async getAllUsers(): Promise<Return<User[]>> {
    try {
      return await this.httpRequest.get<User[]>('/users');
    } catch (error) {
      throw new UserError('Error fetching users data');
    }
  }

  async createUser(createUserDto: RegisterDto): Promise<Return<User>> {
    try {
      return this.httpRequest.post<User>('/users', createUserDto);
    } catch (error) {
      throw new UserError('Error creating user');
    }
  }

  async updateUser(id: number, user: Partial<RegisterDto>): Promise<Return<User>> {
    try {
      return this.httpRequest.put<User>(`/users/${id}`, user);
    } catch (error) {
      throw new UserError('Error updating users data');
    }
  }

  async deleteUser(id: number): Promise<Return<User>> {
    try {
      return this.httpRequest.delete<User>(`/users/${id}`);
    } catch (error) {
      throw new UserError('Error deleting users data');
    }
  }

  async getImportantUserTasks(id: number): Promise<Return<Task[]>> {
    try {
      return this.httpRequest.get<Task[]>(`/users/${id}/prioritized`);
    } catch (error) {
      throw new TaskError('Error getting prioritized user tasks');
    }
  }

  async getTasks(item: User): Promise<Return<Task[]>> {
    try {
      return this.httpRequest.get<Task[]>(`/users/${item.id}/tasks`);
    } catch (error) {
      throw new TaskError('Error getting user tasks');
    }
  }

  async createTask(dto: TaskDto, item: User): Promise<Return<Task>> {
    try {
      return this.httpRequest.post<Task>(`/users/${item.id}/tasks`, dto);
    } catch (error) {
      throw new TaskError('Error creating user task');
    }
  }

  async deleteTask(id: number, item: User): Promise<Return<Task>> {
    try {
      return this.httpRequest.delete<Task>(`/users/${item.id}/tasks/${id}`);
    } catch (error) {
      throw new TaskError('Error deleting user task');
    }
  }
}

export default UserService;
