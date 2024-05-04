import { User } from 'src/models/user.model';
import { Project } from 'src/models/project.model';

export interface Team {
  id: number;
  name: string;
  description: string;
  projects: Project[],
  members: User[],
  admins: User[],
}
