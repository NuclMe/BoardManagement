import { configureStore } from '@reduxjs/toolkit';
import { boardApi } from './boardApi';
import dataSlice from './appDataSlice';
import boardSlice from './boardSlice';
import createdBoardSlice from './createdBoardSlice';

export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    appData: dataSlice,
    boardId: boardSlice,
    createdBoard: createdBoardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
