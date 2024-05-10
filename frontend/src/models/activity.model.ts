import { User } from 'src/models/user.model';

export interface LeisureActivity {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  user?: User;
}
