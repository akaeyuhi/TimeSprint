import BaseService from './base.service';
import HttpRequest from 'src/utils/common/httpRequest';
import { LoginDto } from 'src/services/dto/auth/login.dto';
import { Auth } from 'src/services/types';
import { AuthError } from 'src/services/errors/auth.error';
import { RegisterDto } from 'src/services/dto/auth/register.dto';

export class AuthService extends BaseService {
  constructor(httpRequest: HttpRequest) {
    super(httpRequest);
  }

  async login(auth: LoginDto): Promise<Auth | null> {
    try {
      return await this.httpRequest.post<Auth>('/auth/login', auth);
    } catch (error) {
      throw new AuthError('Error logging in');
    }
  }

  async register(dto: RegisterDto): Promise<Auth | null> {
    try {
      return await this.httpRequest.post<Auth>('/auth/register', dto);
    } catch (error) {
      throw new AuthError('Error registering user');
    }
  }

  async refreshToken(refreshToken: string): Promise<Partial<Auth> | null> {
    try {
      return await this.httpRequest.post('/auth/refresh', { refreshToken });
    } catch (error) {
      throw new AuthError('Error refreshing token');
    }
  }
}
