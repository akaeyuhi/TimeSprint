import { IsDate, Length } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateLeisureActivityDto {
  @Length(8, 20)
  name: string;

  @Length(20)
  description: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  user?: User = null;
}
