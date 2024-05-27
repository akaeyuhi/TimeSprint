import { User } from 'src/models/user.model';
import { Project } from 'src/models/project.model';
import { Item } from 'src/models/item.model';

export interface Team extends Item {
  projects: Project[],
  members: User[],
  admins: User[],
}
