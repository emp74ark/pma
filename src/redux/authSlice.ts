import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signout } from '../services/user.service';
import { AuthState, User } from '../shared/interfaces';

const initialState: AuthState = {
  login: undefined,
  exp: true,
  mode: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => {
      state.login = action.payload.login;
      state.exp = false;
    },
    logOut: (state) => {
      state.login = undefined;
      state.exp = true;
      signout();
    },
    mode: (state, action: PayloadAction<'login' | 'registration'>) => {
      signout();
      state.mode = action.payload;
    },
    signUp: (state) => {
      state.mode = 'login';
    },
    expToggle: (state, action: PayloadAction<boolean>) => {
      state.exp = action.payload;
      if (action.payload) signout();
    },
    resetAuth: (state) => {
      state.mode = null;
    },
  },
});

export const { logIn, logOut, signUp, mode, expToggle, resetAuth } = authSlice.actions;
export default authSlice.reducer;
