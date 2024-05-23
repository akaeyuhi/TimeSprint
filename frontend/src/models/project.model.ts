import { Team } from './team.model';
import { TaskContainer } from 'src/models/task-container.model';
import { Item } from 'src/models/item.model';

export interface Project extends TaskContainer, Item {
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  team?: Team;
}
