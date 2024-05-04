import { User } from 'src/models/user.model';
import { Project } from 'src/models/project.model';

export interface Task {
  id: number;
  name: string;
  description: string;
  urgency: boolean;
  importance: boolean;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  user?: User;
  project?: Project;
}
