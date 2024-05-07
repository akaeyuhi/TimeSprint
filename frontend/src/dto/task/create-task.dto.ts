import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';

export interface CreateTaskDto {
  name: string;
  description: string;
  urgency: boolean;
  importance: boolean;
  startDate: Date;
  endDate: Date;
  dependencies: Task[];
  user?: User
}
