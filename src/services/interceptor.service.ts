import axios from 'axios';
import { BASE_URL } from '../shared/environment';
export const http = axios.create();

const token = localStorage.getItem('token');

http.interceptors.request.use((config) => {
  config.baseURL = BASE_URL;
  config.headers = {
    Authorization: `Bearer ${token}`,
  };
  return config;
});
