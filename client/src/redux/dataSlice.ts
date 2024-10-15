import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  boardId: string;
}

interface TodoState {
  Todo: Task[];
  inProgress: Task[];
  Done: Task[];
}

const initialState: TodoState = {
  Todo: [],
  inProgress: [],
  Done: [],
};

const todoDataSlice = createSlice({
  name: 'todoData',
  initialState,
  reducers: {
    setTodoData(
      state,
      action: PayloadAction<{ Todo: Task[]; inProgress: Task[]; Done: Task[] }>
    ) {
      return action.payload;
    },
    addTodo: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      const status = task.status;

      if (!state[status]) {
        console.error(`Invalid status: ${status}`);
        return;
      }

      state[status].push(task);
    },

    removeTask: (
      state,
      action: PayloadAction<{ _id: string; status: string }>
    ) => {
      const { _id, status } = action.payload;

      if (state[status]) {
        state[status] = state[status].filter((task) => task._id !== _id);
      } else {
        console.error(`Invalid status: ${status}`);
      }
    },
    updateTask: (
      state,
      action: PayloadAction<{
        _id: string;
        title: string;
        description: string;
      }>
    ) => {
      const { _id, title, description } = action.payload;
      for (const status of ['Todo', 'inProgress', 'Done']) {
        const task = state[status].find((task) => task._id === _id);
        if (task) {
          task.title = title;
          task.description = description;
          break;
        }
      }
    },
  },
});

export const { addTodo, setTodoData, removeTask, updateTask } =
  todoDataSlice.actions;
export default todoDataSlice.reducer;
