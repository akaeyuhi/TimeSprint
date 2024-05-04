import { Team } from './team.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  team: Team | null;
  tasks: any[]; // Assuming Task model is not defined yet
}
