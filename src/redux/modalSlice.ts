import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board, Column, ModalState, Task, User } from '../shared/interfaces';

const initialState: ModalState = {
  visible: {
    addBoard: false,
    editBoard: false,
    addColumn: false,
    editColumn: false,
    addTask: false,
    editTask: false,
    authError: false,
    registerError: false,
    editUser: false,
    infoTask: false,
    remove: false,
  },
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ name: string; data: Board | Column | Task | User | null }>
    ) => {
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
