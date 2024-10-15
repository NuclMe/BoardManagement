import { createSlice } from '@reduxjs/toolkit';

const todoDataSlice = createSlice({
  name: 'todoData',
  initialState: [],
  reducers: {
    setTodoData(state, action) {
      return action.payload;
    },
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter((task) => task._id !== action.payload);
    },
    editTodo: (
      state,
      action: PayloadAction<{ _id: string; title: string; description: string }>
    ) => {
      const { _id, title, description } = action.payload;
      const todo = state.find((todo) => todo._id === _id);
      if (todo) {
        todo.title = title;
        todo.description = description;
      }
    },
  },
});

export const { setTodoData, addTodo, removeItem, editTodo } =
  todoDataSlice.actions;
export default todoDataSlice.reducer;
