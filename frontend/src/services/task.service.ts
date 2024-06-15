import { TaskDto } from 'src/services/dto/task.dto';
import { Task } from 'src/models/task.model';
import { TaskContainer } from 'src/models/task-container.model';
import { Return } from 'src/services/types';
import BaseService from './base.service';
import { TaskError } from 'src/services/errors/task.error';
import { ActivityError } from "src/services/errors/activity.error";

export abstract class TaskService<T extends TaskContainer> extends BaseService {
  abstract createTask(dto: TaskDto, item: T): Promise<Return<Task>>;

  abstract deleteTask(taskId: string, item: T): Promise<Return<Task>>;

  async getAllTasks(): Promise<Return<Task[]>> {
    try {
      return this.httpRequest.get<Task[]>(`/tasks`);
    } catch (error) {
      throw new TaskError('Error getting tasks');
    }
  }

  async getTaskById(id: string): Promise<Return<Task>> {
    try {
      return this.httpRequest.get<Task>(`/tasks/${id}`);
    } catch (error) {
      throw new TaskError('Error getting task');
    }
  }

  async updateTask(taskId: string, dto: TaskDto): Promise<Return<Task>> {
    try {
      return this.httpRequest.patch<Task>(`/tasks/${taskId}`, dto);
    } catch (error) {
      throw new TaskError('Error updating user task');
    }
  }

  async toggleTask(task: Task): Promise<Return<Task>> {
    try {
      return this.httpRequest.patch<Task>(`/tasks/${task.id}`, {
        isCompleted: !task.isCompleted,
      });
    } catch (error) {
      throw new TaskError('Error toggling user task');
    }
  }

  async deleteTaskAsAdmin(taskId: string): Promise<Return<void>> {
    try {
      return this.httpRequest.delete<void>(`/tasks/${taskId}`);
    } catch (error) {
      throw new ActivityError('Error deleting task');
    }
  }
}
