import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../shared/interfaces';

const initialState: { all: User[] } = {
  all: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    allUsers: (state, action: PayloadAction<User[]>) => {
      state.all = action.payload;
    },
  },
});

export const { allUsers } = usersSlice.actions;
export default usersSlice.reducer;
