import { AuthStore } from 'src/stores/auth.store';
import { TeamStore } from 'src/stores/team.store';
import { ProjectStore } from 'src/stores/project.store';
import { UserStore } from 'src/stores/user.store';
import { RootService } from 'src/services';

export class RootStore {
  readonly authStore = new AuthStore();
  readonly teamStore: TeamStore;
  readonly projectStore: ProjectStore;
  readonly userStore: UserStore;
  private readonly rootService: RootService;

  constructor() {
    this.rootService = new RootService(this.authStore);
    this.authStore.setAuthService(this.rootService.authService);
    this.teamStore = new TeamStore(this.rootService.teamService);
    this.projectStore = new ProjectStore(this.rootService.projectService);
    this.userStore = new UserStore(this.rootService.userService, this.rootService.teamService);
  }

  get services() {
    return this.rootService;
  }
}

export const store = new RootStore();
