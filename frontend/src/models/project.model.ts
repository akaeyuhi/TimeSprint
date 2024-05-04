import { Team } from './team.model';
import { Task } from 'src/models/task.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  team?: Team;
  tasks: Task[];
}
