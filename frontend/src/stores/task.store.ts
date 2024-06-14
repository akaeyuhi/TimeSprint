import { Task } from 'src/models/task.model';
import { TaskDto } from 'src/services/dto/task.dto';
import { TaskContainer } from 'src/models/task-container.model';
import { SortBy } from 'src/utils/common/sortBy';
import { action } from 'mobx';

export default abstract class TaskStore<T extends TaskContainer> {
  abstract error: Error | null;
  abstract isLoading: boolean;
  abstract current: T;
  abstract tasks: Task[];

  abstract fetch(id?: string): Promise<T>;

  abstract createTask(task: TaskDto): Promise<Task[]>;

  abstract updateTask(taskId: string, taskDto: TaskDto): Promise<Task[]>;

  abstract deleteTask(taskId: string): Promise<void>;

  abstract toggleTask(taskId: string): Promise<Task[]>;

  getTaskById(taskId: string): Task | null {
    return this.tasks.find((task) => task.id === taskId) ?? null;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  @action
  setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }

  sortTasks(sortBy: SortBy): void {
    const sortedTasks = [...this.tasks];
    switch (sortBy) {
      case SortBy.NAME:
        sortedTasks.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortBy.URGENCY:
        sortedTasks.sort((a, b) => Number(b.urgency) - Number(a.urgency));
        break;
      case SortBy.IMPORTANCE:
        sortedTasks.sort((a, b) => Number(b.importance) - Number(a.importance));
        break;
      case SortBy.DEADLINE:
        sortedTasks.sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
        break;
    }
    this.setTasks(sortedTasks);
  }
}
