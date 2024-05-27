import { AuthStore } from 'src/stores/auth.store';
import { TeamStore } from 'src/stores/team.store';
import { ProjectStore } from 'src/stores/project.store';
import { UserStore } from 'src/stores/user.store';

export class RootStore {
  authStore = new AuthStore();
  teamStore = new TeamStore();
  projectStore = new ProjectStore();
  userStore = new UserStore();
}

export const store = new RootStore();
