import { createSlice } from '@reduxjs/toolkit';

const updateTaskStatusSlice = createSlice({
  name: 'updateTaskData',
  initialState: {
    data: null,
  },
  reducers: {
    setUpdateStatus(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setUpdateStatus } = updateTaskStatusSlice.actions;
export default updateTaskStatusSlice.reducer;
