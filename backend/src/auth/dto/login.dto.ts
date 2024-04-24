import { IsEmail, IsString, Length, Matches, Min } from 'class-validator';
import { passwordRegex } from 'src/user/utils';

export class LoginDto {
  @Length(8, 20)
  @IsString()
  username: string;
  @IsEmail()
  @IsString()
  email: string;
  @Matches(passwordRegex)
  @IsString()
  @Min(8)
  password: string;
}
