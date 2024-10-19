import { configureStore } from '@reduxjs/toolkit';
import { boardApi } from './boardApi';
import dataSlice from './appDataSlice';
import boardSlice from './boardSlice';

export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    appData: dataSlice,
    boardId: boardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
