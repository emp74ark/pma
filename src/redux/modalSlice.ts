/* 
  onClick={() => dispatch(openModal('NAME'))}
  onClick={() => dispatch(closeModal('NAME'))}
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Record<string, boolean> = {
  addBoard: false,
  editBoard: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state[action.payload] = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
