import { createSlice } from '@reduxjs/toolkit';

export const breakSlice = createSlice({
  name: 'break',
  initialState: {
    time: 5,
  },
  reducers: {
    increment: (state) => {
      if (state.time < 60)
        state.time += 1;
    },
    decrement: (state) => {
    if (state.time > 1)
      state.time -= 1;
    },
  },
});

export const { increment, decrement } = breakSlice.actions;
export default breakSlice.reducer;