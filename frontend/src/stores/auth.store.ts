import { makePersistable } from 'mobx-persist-store';
import { makeAutoObservable } from 'mobx';

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

  setAccessToken(token: string) {
    this.auth.accessToken = token;
  }

  logout() {
    this.auth = {} as Auth;
  }

  login() {
    //TODO
    return this.auth;
  }

  register() {
    return this.auth;
  }
}
