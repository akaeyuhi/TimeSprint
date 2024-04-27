import { AuthStore } from 'src/stores/auth.store';

export class RootStore {
  authStore = new AuthStore();
}

export const store = new RootStore();
