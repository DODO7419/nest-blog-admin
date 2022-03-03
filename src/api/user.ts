import httpRequest from '../shared/request';
import { IUserFormData } from '../types/user';

/**
 * 用户名密码登录
 * @returns
 */
export const apiUserLogin = (data: IUserFormData) => {
  return httpRequest({
    method: 'POST',
    url: '/api/login',
    data
  });
};
