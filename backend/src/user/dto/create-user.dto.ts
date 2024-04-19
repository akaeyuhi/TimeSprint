import {
  IsEmail,
  IsEnum,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { passwordRegex, UserRole } from 'src/user/utils';

export class CreateUserDto {
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
  @Matches('password')
  confirmPassword: string;
  @IsEnum(UserRole)
  role: UserRole = UserRole.COLLABORATOR;
}
