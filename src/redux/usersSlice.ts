import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, usersState } from '../shared/interfaces';

const initialState: usersState = {
  all: [],
  current: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    allUsers: (state, action: PayloadAction<User[]>) => {
      state.all = action.payload;
    },
    currentUser: (state, action: PayloadAction<User>) => {
      state.current = action.payload;
    },
  },
});

export const { allUsers, currentUser } = usersSlice.actions;
export default usersSlice.reducer;
