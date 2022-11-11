/* 
  onClick={() => dispatch(openModal('NAME, ID'))}
  onClick={() => dispatch(closeModal('NAME, ID'))}
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from '../shared/interfaces';

const initialState: ModalState = {
  visible: {
    addBoard: false,
    editBoard: false,
    remove: false,
  },
  id: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ name: string; id: string | null }>) => {
      state.visible[action.payload.name] = true;
      state.id = action.payload.id;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.visible[action.payload] = false;
    },
    resetModal: () => initialState,
  },
});

export const { openModal, closeModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer;
