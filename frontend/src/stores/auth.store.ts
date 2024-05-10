import { action, computed, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { User } from 'src/models/user.model';

type Auth = {
  refreshToken: string;
  accessToken: string;
  authenticatedUser: User;
};

export class AuthStore {
  @observable auth: Auth = {} as Auth;

  constructor() {
    makeObservable(this);

    makePersistable(this, {
      name: 'AuthStore',
      properties: ['auth'],
      storage: window.localStorage,
    });
  }

  @computed
  get isAuthenticated() {
    return !!this.auth.accessToken;
  }

  @action login() {
    //TODO
    return this.auth;
  }
  @action register() {
    return this.auth;
  }
}
