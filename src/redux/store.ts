import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authSlice from './authSlice';
import modalSlice from './modalSlice';
import settingsSlice from './settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    setting: settingsSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
