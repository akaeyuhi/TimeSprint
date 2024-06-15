import { Team } from './team.model';
import { TaskContainer } from 'src/models/task-container.model';
import { DeadlineItem } from 'src/models/deadline-item.model';
import { Item } from 'src/models/item.model';

export interface Project extends TaskContainer, Item, DeadlineItem {
  isCompleted: boolean;
  team?: Team;
}
