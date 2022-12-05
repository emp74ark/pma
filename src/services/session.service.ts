import { expToggle } from '../redux/authSlice';
import { store } from '../redux/store';

export function sessionIsExpired() {
  const dateExp = localStorage.getItem('exp');
  const dateNow = Date.now();
  store.dispatch(expToggle(Number(dateExp) < dateNow));
}
