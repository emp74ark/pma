import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    logIn: (state, action: PayloadAction<AuthState>) => {
      state.login = action.payload.login;
      state.token = action.payload.token;
    },
    logOut: () => initialState,
    mode: (state, action: PayloadAction<'login' | 'registration'>) => {
      state.mode = action.payload;
    },
  },
});

export const {logIn, logOut, mode} = authSlice.actions;
export default authSlice.reducer;