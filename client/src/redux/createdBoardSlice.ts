import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  createdBoardId: null,
};

export const createdBoardSlice = createSlice({
  name: 'createdBoard',
  initialState,
  reducers: {
    setCreatedBoardId: (state, action) => {
      state.createdBoardId = action.payload;
    },
  },
});

export const { setCreatedBoardId } = createdBoardSlice.actions;
export default createdBoardSlice.reducer;
