import { IsBoolean, IsDate, Length } from 'class-validator';

export class CreateProjectDto {
  @Length(8, 20)
  name: string;

  @Length(20)
  description: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsBoolean()
  isCompleted = false;

  teamId: number;
}
