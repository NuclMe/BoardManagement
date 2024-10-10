import { configureStore } from '@reduxjs/toolkit';
import { boardApi } from './boardApi';
import todoDataSlice from './todoDataSlice';
import inProgressDataSlice from './inProgressDataSlice';
import doneDataSlice from './doneDataSlice';

export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    todoData: todoDataSlice,
    inProgressData: inProgressDataSlice,
    doneData: doneDataSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
