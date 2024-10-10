import { createSlice } from '@reduxjs/toolkit';

const inProgressDataSlice = createSlice({
  name: 'inProgressData',
  initialState: {
    data: null,
  },
  reducers: {
    setInProgressIssues(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setInProgressIssues } = inProgressDataSlice.actions;
export default inProgressDataSlice.reducer;
