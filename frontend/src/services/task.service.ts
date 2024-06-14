import { TaskDto } from 'src/services/dto/task.dto';
import { Task } from 'src/models/task.model';
import { TaskContainer } from 'src/models/task-container.model';
import { Return } from 'src/services/types';
import BaseService from './base.service';
import { TaskError } from 'src/services/errors/task.error';

export abstract class TaskService<T extends TaskContainer> extends BaseService {
  abstract getTasks(item: T): Promise<Task[] | null>;

  abstract createTask(dto: TaskDto, item: T): Promise<Return<Task>>;

  abstract deleteTask(taskId: string, item: T): Promise<Return<Task>>;

  async getTaskById(id: string): Promise<Return<Task>> {
    try {
      return this.httpRequest.get<Task>(`/tasks/${id}`);
    } catch (error) {
      throw new TaskError('Error getting task');
    }
  }

  async updateTask(dto: TaskDto, taskId: string): Promise<Return<Task>> {
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
}
