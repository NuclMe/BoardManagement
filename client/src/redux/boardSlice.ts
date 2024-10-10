import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boardId: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardId: (state, action) => {
      state.boardId = action.payload;
    },
  },
});

export const { setBoardId } = boardSlice.actions;
export default boardSlice.reducer;
