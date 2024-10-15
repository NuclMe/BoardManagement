import { configureStore } from '@reduxjs/toolkit';
import { boardApi } from './boardApi';
import dataSlice from './dataSlice';
import boardSlice from './boardSlice';
import createdBoardSlice from './createdBoardSlice';

export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    todoData: dataSlice,
    boardId: boardSlice,
    createdBoard: createdBoardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
