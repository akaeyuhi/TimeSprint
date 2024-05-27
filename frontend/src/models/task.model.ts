import { User } from 'src/models/user.model';
import { Project } from 'src/models/project.model';
import { Item } from 'src/models/item.model';

export interface Task extends Item {
  urgency: boolean;
  importance: boolean;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  dependencies: Task[];
  user?: User;
  project?: Project;
}
