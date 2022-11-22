import axios from 'axios';
import { BASE_URL, sessionLifetime } from '../shared/environment';
import { LoginResponse } from '../shared/interfaces';

export const http = axios.create();

export function saveToken(response: LoginResponse) {
  if (response.status === 201) {
    localStorage.setItem('token', response.data.token);
    const exp = Date.now() + sessionLifetime;
    localStorage.setItem('exp', exp.toString());
    return true;
  }
  return false;
}

http.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem('token');
  config.baseURL = BASE_URL;
  config.headers = {
    Authorization: `Bearer ${token}`,
  };
  return config;
});
