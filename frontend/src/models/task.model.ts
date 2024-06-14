import { User } from 'src/models/user.model';
import { Project } from 'src/models/project.model';
import { DeadlineItem } from 'src/models/deadline-item.model';
import { Item } from 'src/models/item.model';

export interface Task extends Item, DeadlineItem {
  urgency: boolean;
  importance: boolean;
  isCompleted: boolean;
  dependencies: Task[];
  isOwnTask: boolean;
  user?: User;
  project?: Project;
}
