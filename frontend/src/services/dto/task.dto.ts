import { DeadlineItem } from 'src/models/deadline-item.model';
import { Task } from 'src/models/task.model';
import { User } from 'src/models/user.model';
import { ItemDto } from 'src/services/dto/item.dto';

export interface TaskDto extends ItemDto, DeadlineItem {
  urgency: boolean;
  importance: boolean;
  dependencies: Task[];
  user?: User;
}
