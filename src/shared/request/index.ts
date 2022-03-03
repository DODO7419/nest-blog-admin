import { AxiosRequestConfig } from 'axios';
import interceptor from './core/interceptor';

const httpRequest = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return interceptor.okHttp.request<any, T>(config);
};

export default httpRequest;
