import { createSlice } from '@reduxjs/toolkit';

const todoDataSlice = createSlice({
  name: 'todoData',
  initialState: {
    data: null,
  },
  reducers: {
    setTodoData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setTodoData } = todoDataSlice.actions;
export default todoDataSlice.reducer;
