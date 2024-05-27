import { LeisureActivity } from './activity.model';
import { Team } from './team.model';
import { AdminRole } from 'src/models/roles.enum';
import { TaskContainer } from 'src/models/task-container.model';

export interface User extends TaskContainer {
  id: number;
  username: string;
  email: string;
  role: AdminRole;
  activities: LeisureActivity[];
  teams: Team[];
}
