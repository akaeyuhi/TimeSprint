import { User } from 'src/models/user.model';
import { Task } from 'src/models/task.model';

export type Auth = {
  refreshToken: string;
  accessToken: string;
  user: User;
};

export type UserReturn = User | null;
export type TaskReturn = Task | null;
