import { IsBoolean, IsDateString, Length } from 'class-validator';

export class CreateProjectDto {
  @Length(8, 20)
  name: string;

  @Length(20)
  description: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsBoolean()
  isCompleted = false;

  teamId: number;
}
