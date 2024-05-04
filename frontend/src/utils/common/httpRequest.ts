import { HttpClientRequestConfig, IHttpClient } from './httpClient';

export class HttpRequest {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  get<T>(url: string, isAuth?: boolean) {
    return this.httpClient.request<T>({
      url,
      method: 'GET',
      isAuth,
    });
  }

  post<T>(
    url: string,
    data?: HttpClientRequestConfig['data'],
    isAuth?: boolean,
  ) {
    return this.httpClient.request<T>({ url, method: 'POST', data, isAuth });
  }

  patch<T>(
    url: string,
    data: HttpClientRequestConfig['data'],
    isAuth?: boolean,
  ) {
    return this.httpClient.request<T>({ url, method: 'PATCH', data, isAuth });
  }

  put<T>(url: string, data: HttpClientRequestConfig['data'], isAuth?: boolean) {
    return this.httpClient.request<T>({ url, method: 'PUT', data, isAuth });
  }

  delete<T>(url: string, isAuth?: boolean) {
    return this.httpClient.request<T>({ url, method: 'DELETE', isAuth });
  }
}

export default HttpRequest;
