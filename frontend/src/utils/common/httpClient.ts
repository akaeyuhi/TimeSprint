import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { ErrorHandler } from './errorHandler';
import { AuthStore } from 'src/stores/auth.store';

export type HttpClientRequestConfig = {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: any;
  isAuth?: boolean;
};

export interface IHttpClient {
  baseUrl: string;

  request<T>(config: HttpClientRequestConfig): Promise<T | null>;
}

type CustomHttpClientArgs = {
  baseUrl: string;
  authStore: AuthStore;
};

type BackendError = {
  message: string | string[],
  error: string,
  statusCode: number,
}

class CustomHttpClient implements IHttpClient {
  baseUrl: string;
  private axios: AxiosInstance = axios.create();
  private errorHandler: ErrorHandler = new ErrorHandler();
  private authStore: AuthStore | undefined;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor({ baseUrl, authStore }: CustomHttpClientArgs) {
    this.baseUrl = baseUrl;
    this.authStore = authStore;

    this.initializeTokenInterceptor();
    this.initializeRefreshInterceptor();
  }

  async request<T>({ url, method, data }: HttpClientRequestConfig) {
    const requestConfig: AxiosRequestConfig = {
      url: this.baseUrl + url,
      method,
      data,
    };
    try {
      const res = await this.axios.request<T>(requestConfig);
      return res?.data;
    } catch (err) {
      const error = err as AxiosError;
      const data = error.response?.data as BackendError;
      const errorMsg = (data && data.message instanceof Array ?
        'Error: ' + data.message.join(', ') : String(data.message));
      this.errorHandler.handle(errorMsg);
    }
    return null;
  }

  private initializeTokenInterceptor() {
    this.axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.authStore?.isAuthenticated) {
          config.headers['Authorization'] = `Bearer ${this.authStore?.auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private initializeRefreshInterceptor() {
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest?._retry &&
          (error.response?.data as any).message !== 'Invalid password or email') {
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                resolve(this.axios(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshToken();
            this.isRefreshing = false;
            this.onRefreshed(newToken);
            originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
            return this.axios(originalRequest);
          } catch (err) {
            this.isRefreshing = false;
            this.authStore?.logout();
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  private async refreshToken(): Promise<string> {
    const response = await this.axios.post('/auth/refresh', {
      refreshToken: this.authStore?.auth.refreshToken,
    });
    const newToken = response.data.accessToken;
    this.authStore?.setAccessToken(newToken);
    return newToken;
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }
}

export default CustomHttpClient;
