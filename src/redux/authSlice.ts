import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  login: string | undefined,
  token: string | undefined,
}

const initialState: AuthState = {
  login: undefined,
  token: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<AuthState>) => {
      state.login = action.payload.login;
      state.token = action.payload.token;
    },
    logOut: () => initialState
  },
});

export const {logIn, logOut} = authSlice.actions;
export default authSlice.reducer;