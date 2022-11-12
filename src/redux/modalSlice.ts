/* 
  onClick={() => dispatch(openModal('NAME, ID'))}
  onClick={() => dispatch(closeModal('NAME, ID'))}
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board, Column, ModalState } from '../shared/interfaces';

const initialState: ModalState = {
  visible: {
    addBoard: false,
    editBoard: false,
    remove: false,
    addColumn: false,
  },
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ name: string; data: Board | Column | null }>) => {
      state.visible[action.payload.name] = true;
      state.data = action.payload.data;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.visible[action.payload] = false;
    },
    resetModal: () => initialState,
  },
});

export const { openModal, closeModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer;
