import { Team } from './team.model';
import { TaskContainer } from 'src/models/task-container.model';

export interface Project extends TaskContainer {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  team?: Team;
}
