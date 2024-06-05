import { makePersistable } from 'mobx-persist-store';
import { makeAutoObservable, runInAction } from 'mobx';
import { Auth } from 'src/services/types';
import { AuthService } from 'src/services/auth.service';
import { LoginDto } from 'src/services/dto/auth/login.dto';
import { RegisterDto } from 'src/services/dto/auth/register.dto';

export class AuthStore {
  auth: Auth = {} as Auth;
  error: Error | null = null;
  isLoading = false;
  authService: AuthService | null = null;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'AuthStore',
      properties: ['auth'],
      storage: window.localStorage,
    });
  }

  setAuthService(authService: AuthService) {
    this.authService = authService;
  }

  get isAuthenticated() {
    return !!this.auth.accessToken;
  }

  setAccessToken(token: string) {
    this.auth.accessToken = token;
  }

  logout() {
    this.auth = {} as Auth;
  }

  async login(authDto: LoginDto) {
    if (!this.authService) {
      throw new Error('AuthService not set');
    }
    this.isLoading = true;
    try {
      const auth = await this.authService.login(authDto);
      runInAction(() => {
        this.auth = auth as Auth;
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async register(registerDto: RegisterDto) {
    if (!this.authService) {
      throw new Error('AuthService not set');
    }
    this.isLoading = true;
    try {
      const auth = await this.authService.register(registerDto);
      runInAction(() => {
        this.auth = auth as Auth;
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async refreshToken(refreshToken: string) {
    if (!this.authService) {
      throw new Error('AuthService not set');
    }
    this.isLoading = true;
    try {
      const updatedAuth = await this.authService.refreshToken(refreshToken);
      runInAction(() => {
        Object.assign(this.auth, updatedAuth);
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
