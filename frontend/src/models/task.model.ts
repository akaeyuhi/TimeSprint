import { User } from 'src/models/user.model';
import { Project } from 'src/models/project.model';
import { Item } from 'src/models/item.model';
import { DeadlineItem } from 'src/models/deadline-item.model';

export interface Task extends Item, DeadlineItem {
  urgency: boolean;
  importance: boolean;
  isCompleted: boolean;
  dependencies: Task[];
  user?: User;
  project?: Project;
}
