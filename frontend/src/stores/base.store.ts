import { Task } from 'src/models/task.model';
import { CreateTaskDto } from 'src/dto/task/create-task.dto';
import { UpdateTaskDto } from 'src/dto/task/update-task.dto';

export default abstract class TaskStore {
  abstract error: Error | null;
  abstract isLoading: boolean;
  abstract tasks: Task[];
  abstract fetch(id: number): Promise<void>;
  abstract getTasks(): Task[];
  abstract getTaskById(taskId: number): Task | null;
  abstract createTask(task: CreateTaskDto): Promise<Task>;
  abstract updateTask(taskId: number, taskDto: UpdateTaskDto): Promise<Task | null>;
  abstract deleteTask(taskId: number): Promise<number>;
}
