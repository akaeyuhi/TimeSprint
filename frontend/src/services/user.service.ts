import { User } from 'src/models/user.model';
import { UserError } from 'src/services/errors/user.error';
import { RegisterDto } from 'src/services/dto/register.dto';
import { Task } from 'src/models/task.model';
import { TaskDto } from 'src/services/dto/task.dto';
import { Return } from 'src/services/types';
import { TaskError } from 'src/services/errors/task.error';
import { TaskService } from 'src/services/task.service';
import { LeisureActivityDto } from 'src/services/dto/activity.dto';
import { LeisureActivity } from 'src/models/activity.model';
import { ActivityError } from 'src/services/errors/activity.error';

class UserService extends TaskService<User> {
  async getUser(id: string): Promise<Return<User>> {
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

  async updateUser(
    id: string,
    user: Partial<RegisterDto>
  ): Promise<Return<User>> {
    try {
      return this.httpRequest.put<User>(`/users/${id}`, user);
    } catch (error) {
      throw new UserError('Error updating users data');
    }
  }

  async deleteUser(id: string): Promise<Return<User>> {
    try {
      return this.httpRequest.delete<User>(`/users/${id}`);
    } catch (error) {
      throw new UserError('Error deleting users data');
    }
  }

  async getImportantUserTasks(id: string): Promise<Return<Task[]>> {
    try {
      return this.httpRequest.get<Task[]>(`/users/${id}/prioritized`);
    } catch (error) {
      throw new TaskError('Error getting prioritized user tasks');
    }
  }

  async createTask(dto: TaskDto, item: User): Promise<Return<Task>> {
    try {
      return this.httpRequest.post<Task>(`/users/${item.id}/tasks`, dto);
    } catch (error) {
      throw new TaskError('Error creating user task');
    }
  }

  async deleteTask(id: string, item: User): Promise<Return<Task>> {
    try {
      return this.httpRequest.delete<Task>(`/users/${item.id}/tasks/${id}`);
    } catch (error) {
      throw new TaskError('Error deleting user task');
    }
  }

  async createActivity(
    dto: LeisureActivityDto,
    item: User
  ): Promise<Return<LeisureActivity>> {
    try {
      return this.httpRequest.post<LeisureActivity>(
        `/users/${item.id}/activities/`,
        dto
      );
    } catch (error) {
      throw new ActivityError('Error creating activity');
    }
  }

  async deleteActivity(
    id: string,
    item: User
  ): Promise<Return<LeisureActivity>> {
    try {
      return this.httpRequest.delete<LeisureActivity>(
        `/users/${item.id}/activities/${id}`
      );
    } catch (error) {
      throw new ActivityError('Error deleting activity');
    }
  }

  async grantAdmin(id: string): Promise<Return<User>> {
    try {
      return this.httpRequest.post<User>(`/users/${id}/grant-admin`);
    } catch (error) {
      throw new UserError('Error granting admin privilege');
    }
  }

  async revokeAdmin(id: string): Promise<Return<User>> {
    try {
      return this.httpRequest.post<User>(`/users/${id}/revoke-admin`);
    } catch (error) {
      throw new UserError('Error revoking admin privilege ');
    }
  }
}

export default UserService;
