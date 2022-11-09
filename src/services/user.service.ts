import { sessionLifetime } from '../shared/environment';
import { User } from '../shared/interfaces';
import { http } from './interceptor.service';

function signin(user: User) {
  http.post('/signin', user).then((response) => {
    localStorage.setItem('token', response.data.token);
    const exp = Date.now() + sessionLifetime;
    localStorage.setItem('exp', exp.toString());
  });
}

function signup(user: User) {
  http.post('/signup', user);
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
