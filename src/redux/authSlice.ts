import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signin, signout, signup } from '../services/user.service';
import { AuthState, User } from '../shared/interfaces';

const initialState: AuthState = {
  login: undefined,
  exp: true,
  mode: 'login',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => {
      signin(action.payload);
      state.login = action.payload.login;
      state.exp = false;
    },
    logOut: () => initialState,
    mode: (state, action: PayloadAction<'login' | 'registration'>) => {
      signout();
      state.mode = action.payload;
    },
    signUp: (state, action: PayloadAction<User>) => {
      signup(action.payload);
      state.mode = 'login';
    },
    expToggle: (state, action: PayloadAction<boolean>) => {
      state.exp = action.payload;
      if (action.payload) signout();
    },
  },
});

export const { logIn, logOut, signUp, mode, expToggle } = authSlice.actions;
export default authSlice.reducer;
