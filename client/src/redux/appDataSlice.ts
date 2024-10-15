import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus, AppState } from '../types';

const initialState: AppState = {
  Todo: [],
  inProgress: [],
  Done: [],
};

const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    setAppData(
      state,
      action: PayloadAction<{ Todo: Task[]; inProgress: Task[]; Done: Task[] }>
    ) {
      state.Todo = action.payload.Todo;
      state.inProgress = action.payload.inProgress;
      state.Done = action.payload.Done;
    },
    addTodo: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      const status = task.status as TaskStatus;

      if (!state[status]) {
        console.error(`Invalid status: ${status}`);
        return;
      }

      state[status].push(task);
    },

    removeTask: (
      state,
      action: PayloadAction<{ _id: string; status: TaskStatus }>
    ) => {
      const { _id, status } = action.payload;

      if (state[status]) {
        state[status] = state[status].filter((task: Task) => task._id !== _id);
      } else {
        console.error(`Invalid status: ${status}`);
      }
    },

    updateTask: (
      state,
      action: PayloadAction<{ _id: string; title: string; description: string }>
    ) => {
      const { _id, title, description } = action.payload;
      for (const status of ['Todo', 'inProgress', 'Done'] as TaskStatus[]) {
        const task = state[status].find((task: Task) => task._id === _id);
        if (task) {
          task.title = title;
          task.description = description;
          break;
        }
      }
    },

    moveTask: (
      state,
      action: PayloadAction<{ _id: string; status: TaskStatus }>
    ) => {
      const { _id, status } = action.payload;

      if (!state[status]) {
        console.error(`Invalid status: ${status}`);
        return;
      }

      for (const currentStatus of [
        'Todo',
        'inProgress',
        'Done',
      ] as TaskStatus[]) {
        const taskIndex = state[currentStatus].findIndex(
          (task: Task) => task._id === _id
        );
        if (taskIndex !== -1) {
          const [task] = state[currentStatus].splice(taskIndex, 1);
          task.status = status;
          state[status].push(task);
          break;
        }
      }
    },
  },
});

export const { addTodo, setAppData, removeTask, updateTask, moveTask } =
  appDataSlice.actions;
export default appDataSlice.reducer;
