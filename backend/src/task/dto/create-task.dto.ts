import { IsDate, Length } from 'class-validator';

export class CreateTaskDto {
  @Length(8, 20)
  name: string;

  @Length(20)
  description: string;

  urgency: boolean;

  importance: boolean;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
