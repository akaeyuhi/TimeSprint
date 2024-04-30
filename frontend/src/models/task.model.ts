export interface Task {
  id: number;
  name: string;
  description: string;
  urgency: boolean;
  importance: boolean;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
}
