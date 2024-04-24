import {IsBoolean, IsDate, IsString, Length} from 'class-validator';

export class CreateTaskDto {
  @Length(8, 20)
  @IsString()
  name: string;

  @Length(20)
  @IsString()
  description: string;

  @IsBoolean()
  urgency = false;

  @IsBoolean()
  importance = false;

  @IsDate()
  startDate: Date;

  @IsBoolean()
  isCompleted = false;

  @IsDate()
  endDate: Date;
}
