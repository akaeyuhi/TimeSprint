import { LeisureActivity } from './activity.model';
import { Task } from './task.model';
import { Team } from './team.model';
import { AdminRole } from 'src/models/roles.enum';

export interface User {
  id: number;
  username: string;
  email: string;
  role: AdminRole;
  activities: LeisureActivity[];
  tasks: Task[];
  teams: Team[];
}
