import axios from 'axios';
import { User } from '../shared/interfaces';
import { BASE_URL } from '../shared/environment';

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

export { signin, signup, signout };
