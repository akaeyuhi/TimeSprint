import { User } from 'src/models/user.model';
import { Task } from 'src/models/task.model';
import { Team } from 'src/models/team.model';
import { Project } from 'src/models/project.model';

export type Auth = {
  refreshToken: string;
  accessToken: string;
  user: User;
};

export type UserReturn = User | User[] | null;
export type TaskReturn = Task | Task[] | null;
export type TeamReturn = Team | Team[] | null;
export type ProjectReturn = Project | Project[] | null;
