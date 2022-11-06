import axios from 'axios';
import { User } from '../shared/interfaces';
import { BASE_URL } from '../shared/environment';

const token = localStorage.getItem('token'); // TODO: move to interceptor

function signin(user: User) {
  axios.post(`${BASE_URL}/signin`, user).then((response) => {
    localStorage.setItem('token', response.data.token);
    const exp = Date.now() + 86400000; // today + 24h
    localStorage.setItem('exp', exp.toString());
  });
}

function signup(user: User) {
  axios.post(`${BASE_URL}/signup`, user);
}

function signout() {
  localStorage.clear();
}

function getAllUsers() {
  const response = axios.get<User[]>(`${BASE_URL}/users`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
}

function getUserById(id: string) {
  const response = axios.get<User>(`${BASE_URL}/users/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
}

function deleteUser(user: User) {
  const response = axios.delete(`${BASE_URL}/users/${user.id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response;
}

function editUser(user: User) {
  const response = axios.put<User>(
    `${BASE_URL}/users/${user.id}`,
    { name: user.name, login: user.login, password: user.password },
    { headers: { authorization: `Bearer ${token}` } }
  );
  return response;
}

export { signin, signup, signout };
