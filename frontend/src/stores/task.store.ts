import { Task } from 'src/models/task.model';
import { CreateTaskDto } from 'src/services/dto/task/create-task.dto';
import { UpdateTaskDto } from 'src/services/dto/task/update-task.dto';
import { TaskContainer } from 'src/models/task-container.model';

export default abstract class TaskStore<T extends TaskContainer> {
  abstract error: Error | null;
  abstract isLoading: boolean;
  abstract current: T;

  abstract fetch(id?: number): Promise<T>;

  abstract getTasks(): Task[];

  abstract getTaskById(taskId: number): Task | null;

  abstract createTask(task: CreateTaskDto): Promise<Task[]>;

  abstract updateTask(taskId: number, taskDto: UpdateTaskDto): Promise<Task[]>;

  abstract deleteTask(taskId: number): Promise<void>;

  abstract toggleTask(taskId: number): Promise<Task[]>;

  abstract sortTasks(tasks: Task[]): void;
}
