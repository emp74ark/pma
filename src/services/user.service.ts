import { User } from '../shared/interfaces';
import { http } from './interceptor.service';

function signin(user: User) {
  return http.post('/signin', user);
}

function signup(user: User) {
  return http.post('/signup', user);
}

function signout() {
  localStorage.clear();
}

function getAllUsers() {
  return http.get<User[]>('/users');
}

function getUserById(id: string) {
  return http.get<User>(`/users/${id}`);
}

function deleteUser(user: User) {
  return http.delete(`/users/${user.id}`);
}

function editUser(user: User) {
  return http.put<User>(`/users/${user.id}`, {
    name: user.name,
    login: user.login,
    password: user.password,
  });
}

export { signin, signup, signout, getAllUsers, getUserById, deleteUser, editUser };
