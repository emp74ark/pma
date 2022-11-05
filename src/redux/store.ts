import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./authApi";
import authSlice from "./authSlice";
import { boardsApi } from "./boardsApi";
import { columnsApi } from "./columnsApi";
import { tasksApi } from "./tasksApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(boardsApi.middleware)
      .concat(columnsApi.middleware)
      .concat(tasksApi.middleware),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;