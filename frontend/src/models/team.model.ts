import { User } from 'src/models/user.model';

export interface Team {
  id: number;
  name: string;
  description: string;
  projects: any[],
  members: User[],
  admins: User[],
}
