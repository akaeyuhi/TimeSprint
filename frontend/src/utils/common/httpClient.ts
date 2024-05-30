import { RootStore } from 'src/stores/root.store';
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig } from 'axios';
import { ErrorHandler } from './errorHandler';

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
  rootStore: RootStore;
};

class CustomHttpClient implements IHttpClient {
  baseUrl: string;
  private axios: AxiosInstance = axios.create();
  private errorHandler: ErrorHandler = new ErrorHandler();
  private rootStore: RootStore | undefined;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor({ baseUrl, rootStore }: CustomHttpClientArgs) {
    this.baseUrl = baseUrl;
    this.rootStore = rootStore;

    this.initializeTokenInterceptor();
    this.initializeRefreshInterceptor();
  }

  private initializeTokenInterceptor() {
    this.axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.rootStore?.authStore.isAuthenticated) {
          config.headers['Authorization'] = `Bearer ${this.rootStore?.authStore.auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private initializeRefreshInterceptor() {
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest?._retry) {
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
            this.rootStore?.authStore.logout();
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<string> {
    const response = await this.axios.post('/auth/refresh', {
      refreshToken: this.rootStore?.authStore.auth.refreshToken,
    });
    const newToken = response.data.accessToken;
    this.rootStore?.authStore.setAccessToken(newToken);
    return newToken;
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  async request<T>({ url, method }: HttpClientRequestConfig) {
    const requestConfig: AxiosRequestConfig = {
      url: this.baseUrl + url,
      method,
    };

    try {
      const res = await this.axios.request<T>(requestConfig);
      return res?.data;
    } catch (err) {
      this.errorHandler.handle(String(err as AxiosError));
    }

    return null;
  }
}

export default CustomHttpClient;
