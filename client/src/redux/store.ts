import { configureStore } from '@reduxjs/toolkit';
import { boardApi } from './boardApi';
import todoDataSlice from './todoDataSlice';
import inProgressDataSlice from './inProgressDataSlice';
import doneDataSlice from './doneDataSlice';
import boardSlice from './boardSlice';
import createdBoardSlice from './createdBoardSlice';

export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    todoData: todoDataSlice,
    inProgressData: inProgressDataSlice,
    doneData: doneDataSlice,
    boardId: boardSlice,
    createdBoard: createdBoardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
