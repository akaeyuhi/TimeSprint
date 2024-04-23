import { IsString, Length, Min } from 'class-validator';
export class CreateTeamDto {
  @IsString()
  @Length(8, 20)
  name: string;
  @IsString()
  @Min(20)
  description: string;
  adminIds?: number[];
}
