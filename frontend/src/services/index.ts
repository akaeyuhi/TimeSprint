import CustomHttpClient from 'src/utils/common/httpClient';
import HttpRequest from 'src/utils/common/httpRequest';
import { AuthService } from './auth.service';
import * as process from 'node:process';
import UserService from 'src/services/user.service';
import ProjectService from 'src/services/project.service';
import TeamService from 'src/services/team.service';
import { AuthStore } from 'src/stores/auth.store';

export class RootService {
  authService: AuthService;
  userService: UserService;
  projectService: ProjectService;
  teamService: TeamService;

  constructor(authStore: AuthStore) {
    const httpClient = new CustomHttpClient({
      authStore,
      baseUrl: process.env.REACT_APP_API_URL!,
    });
    const httpRequest = new HttpRequest(httpClient);

    this.authService = new AuthService(httpRequest);
    this.userService = new UserService(httpRequest);
    this.projectService = new ProjectService(httpRequest);
    this.teamService = new TeamService(httpRequest);
  }
}
