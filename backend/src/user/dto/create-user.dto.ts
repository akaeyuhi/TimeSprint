import { IsEmail, IsEnum, IsString, Length, Matches } from 'class-validator';
import { AdminRole, passwordRegex } from 'src/user/utils';

export class CreateUserDto {
  @Length(8, 20)
  @IsString()
  username: string;
  @IsEmail()
  @IsString()
  email: string;
  @Matches(passwordRegex)
  @IsString()
  @Length(8)
  password: string;
  @IsEnum(AdminRole)
  role: AdminRole = AdminRole.USER;
}
