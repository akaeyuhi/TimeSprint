import BaseService from './base.service';
import { LoginDto } from 'src/services/dto/login.dto';
import { Auth, Return } from 'src/services/types';
import { AuthError } from 'src/services/errors/auth.error';
import { RegisterDto } from 'src/services/dto/register.dto';

export class AuthService extends BaseService {
  async login(auth: LoginDto): Promise<Return<Auth>> {
    try {
      return await this.httpRequest.post<Auth>('/auth/login', auth);
    } catch (error) {
      throw new AuthError('Error logging in');
    }
  }

  async register(dto: RegisterDto): Promise<Return<Auth>> {
    try {
      return await this.httpRequest.post<Auth>('/auth/register', dto);
    } catch (error) {
      throw new AuthError('Error registering user');
    }
  }

  async refreshToken(refreshToken: string): Promise<Partial<Return<Auth>>> {
    try {
      return await this.httpRequest.post('/auth/refresh', { refreshToken });
    } catch (error) {
      throw new AuthError('Error refreshing token');
    }
  }
}
