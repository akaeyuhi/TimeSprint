import { User } from 'src/models/user.model';
import { Item } from 'src/models/item.model';

export interface LeisureActivity extends Item {
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  user?: User;
}
