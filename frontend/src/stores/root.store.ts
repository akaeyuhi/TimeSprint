import { AuthStore } from 'src/stores/auth.store';
import { TeamStore } from 'src/stores/team.store';
import { ProjectStore } from 'src/stores/project.store';

export class RootStore {
  authStore = new AuthStore();
  teamStore = new TeamStore();
  projectStore = new ProjectStore();
}

export const store = new RootStore();
