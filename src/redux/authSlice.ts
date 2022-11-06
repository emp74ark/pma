import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../shared/interfaces";
import { signin, signout, signup } from "../services/user.service";

interface AuthState {
  login: string | undefined,
  token: string | undefined,
  mode: 'login' | 'registration'
}

const initialState: AuthState = {
  login: undefined,
  token: undefined,
  mode: 'login',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => {
      signin(action.payload);
      state.login = action.payload.login;
    },
    logOut: () => initialState,
    mode: (state, action: PayloadAction<'login' | 'registration'>) => {
      signout();
      state.mode = action.payload;
    },
    signUp: (state, action: PayloadAction<User>) => {
      signup(action.payload);
      state.mode = 'login';
    } 
  },
});

export const {logIn, logOut, signUp, mode} = authSlice.actions;
export default authSlice.reducer;