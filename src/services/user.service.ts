import { User } from '../shared/interfaces';
import { http } from './interceptor.service';

function signin(user: User) {
  const response = http.post('/signin', user);
  return response;
}

function signup(user: User) {
  const response = http.post('/signup', user);
  return response;
}

function signout() {
  localStorage.clear();
}

function getAllUsers() {
  const response = http.get<User[]>('/users');
  return response;
}

function getUserById(id: string) {
  const response = http.get<User>(`/users/${id}`);
  return response;
}

function deleteUser(user: User) {
  const response = http.delete(`/users/${user.id}`);
  return response;
}

function editUser(user: User) {
  const response = http.put<User>(`/users/${user.id}`, {
    name: user.name,
    login: user.login,
    password: user.password,
  });
  return response;
}

export { signin, signup, signout, getAllUsers, getUserById, deleteUser, editUser };
