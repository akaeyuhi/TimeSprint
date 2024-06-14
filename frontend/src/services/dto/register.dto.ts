import { LoginDto } from 'src/services/dto/login.dto';

export interface RegisterDto extends LoginDto {
  username: string;
  confirmPassword: string;
}
