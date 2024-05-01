import { AuthStore } from 'src/stores/auth.store';
import { TeamStore } from 'src/stores/team.store';

export class RootStore {
  authStore = new AuthStore();
  teamStore = new TeamStore();
}

export const store = new RootStore();
