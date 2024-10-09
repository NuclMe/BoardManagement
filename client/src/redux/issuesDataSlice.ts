import { createSlice } from '@reduxjs/toolkit';

const issuesDataSlice = createSlice({
  name: 'issuesData',
  initialState: {
    data: null,
  },
  reducers: {
    setIssuesData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setIssuesData } = issuesDataSlice.actions;
export default issuesDataSlice.reducer;
