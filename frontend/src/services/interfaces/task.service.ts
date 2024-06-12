import { TaskDto } from 'src/services/dto/task/task.dto';
import { Task } from 'src/models/task.model';
import { TaskContainer } from 'src/models/task-container.model';
import { TaskReturn } from 'src/services/types';

export interface ITaskService<T extends TaskContainer> {
  getTasks(item: T): Promise<Task[] | null>;

  getTaskById(id: number): Promise<TaskReturn>;

  createTask(dto: TaskDto, item: T): Promise<TaskReturn>;

  updateTask(dto: TaskDto, taskId: number): Promise<TaskReturn>;

  deleteTask(taskId: number, item: T): Promise<TaskReturn>;

  toggleTask(task: Task, item: T): Promise<TaskReturn>;
}
