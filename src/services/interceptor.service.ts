import axios from 'axios';
import { BASE_URL } from '../shared/environment';
export const http = axios.create();

function checkToken() {
  const exp = localStorage.getItem('exp');
  const now = Date.now();
  const token = Number(exp) > now ? localStorage.getItem('token') : '';
  return token;
}

const token = localStorage.getItem('token');
// const token = checkToken(); // FIXME: find a right place to check token date

checkToken();

http.interceptors.request.use((config) => {
  config.baseURL = BASE_URL;
  config.headers = {
    Authorization: `Bearer ${token}`,
  };
  return config;
});
