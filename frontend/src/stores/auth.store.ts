import { makePersistable } from 'mobx-persist-store';
import { User } from 'src/models/user.model';
import { makeAutoObservable } from 'mobx';

type Auth = {
  refreshToken: string;
  accessToken: string;
  user: User;
};

export class AuthStore {
  auth: Auth = { user: { id: 3 } } as Auth;
  error: Error | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'AuthStore',
      properties: ['auth'],
      storage: window.localStorage,
    });
  }

  get isAuthenticated() {
    return !!this.auth.accessToken;
  }

  login() {
    //TODO
    return this.auth;
  }

  register() {
    return this.auth;
  }
}
