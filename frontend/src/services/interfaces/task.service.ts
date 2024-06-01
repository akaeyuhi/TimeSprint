import { CreateTaskDto } from 'src/services/dto/task/create-task.dto';
import { Task } from 'src/models/task.model';
import { UpdateTaskDto } from 'src/services/dto/task/update-task.dto';
import { TaskContainer } from 'src/models/task-container.model';
import { TaskReturn } from 'src/services/types';

export interface ITaskService<T extends TaskContainer> {
  getTasks(item: T): Promise<TaskReturn>;
  createTask(dto: CreateTaskDto, item: T): Promise<TaskReturn>;
  updateTask(dto: UpdateTaskDto, taskId: number): Promise<TaskReturn>;
  deleteTask(taskId: number, item: T): Promise<TaskReturn>;
  toggleTask(task: Task, item: T): Promise<TaskReturn>;
}
