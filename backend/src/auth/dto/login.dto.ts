import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { passwordRegex } from 'src/user/utils';

export class LoginDto {
  @IsEmail()
  @IsString()
  email: string;
  @Matches(passwordRegex)
  @IsString()
  @Length(8)
  password: string;
}
