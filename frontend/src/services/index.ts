import CustomHttpClient from 'src/utils/common/httpClient';
import HttpRequest from 'src/utils/common/httpRequest';
import { AuthService } from './auth.service';

export class RootService {
  authService: AuthService;

  constructor() {
    const httpClient = new CustomHttpClient({
      baseUrl: process.env.REACT_APP_API_URL!,
    });
    const httpRequest = new HttpRequest(httpClient);

    this.authService = new AuthService(httpRequest);
  }
}
