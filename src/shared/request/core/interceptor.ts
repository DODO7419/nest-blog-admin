import { message } from 'antd';
import axios, { AxiosInstance } from 'axios';
import config from './config';

class Interceptor {
  private static instance: Interceptor;
  okHttp: AxiosInstance;

  constructor() {
    this.okHttp = axios.create({
      timeout: config.timeout
    });
    this.init();
  }

  init() {
    this.okHttp.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (config.headers && token) {
        config.headers.token = token;
      }
      return config;
    });

    this.okHttp.interceptors.response.use((response) => {
      if (response.status === 401) {
        message.error('抱歉，您的登录状态已失效');
        return;
      }

      if (response.status === 403) {
        message.error('抱歉，您无权访问');
        return;
      }

      return response.data;
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Interceptor();
    }
    return this.instance;
  }
}

export default Interceptor.getInstance();
