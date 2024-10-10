import { createSlice } from '@reduxjs/toolkit';

const doneDataSlice = createSlice({
  name: 'doneData',
  initialState: {
    data: null,
  },
  reducers: {
    setDoneIssues(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setDoneIssues } = doneDataSlice.actions;
export default doneDataSlice.reducer;
