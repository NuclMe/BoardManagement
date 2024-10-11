import { configureStore } from '@reduxjs/toolkit';
import { boardApi } from './boardApi';
import todoDataSlice from './todoDataSlice';
import inProgressDataSlice from './inProgressDataSlice';
import doneDataSlice from './doneDataSlice';
import boardSlice from './boardSlice';
import updateTaskStatusSlice from './updateTaskSlice';

export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    todoData: todoDataSlice,
    inProgressData: inProgressDataSlice,
    doneData: doneDataSlice,
    boardId: boardSlice,
    updateTaskData: updateTaskStatusSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
