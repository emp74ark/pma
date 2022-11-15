import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board, Column, ModalState, Task } from '../shared/interfaces';

const initialState: ModalState = {
  visible: {
    addBoard: false,
    editBoard: false,
    removeBoard: false,
    addColumn: false,
    editColumn: false,
    removeColumn: false,
    addTask: false,
    editTask: false,
    removeTask: false,
    authError: false,
    registerError: false,
  },
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ name: string; data: Board | Column | Task | null }>
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
