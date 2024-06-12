import { IsString, Length } from 'class-validator';
export class CreateTeamDto {
  @IsString()
  @Length(8, 20)
  name: string;
  @IsString()
  @Length(20)
  description: string;
  adminIds?: number[];
}
