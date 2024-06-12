import { User } from 'src/models/user.model';
import { Item } from 'src/models/item.model';
import { DeadlineItem } from 'src/models/deadline-item.model';

export interface LeisureActivity extends Item, DeadlineItem {
  isCompleted: boolean;
  user?: User;
}
