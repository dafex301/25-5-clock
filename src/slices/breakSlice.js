import { createSlice } from '@reduxjs/toolkit';

export const breakSlice = createSlice({
  name: 'break',
  initialState: {
    time: 300000,
  },
  reducers: {
    increment: (state) => {
      if (state.time < (60000 * 60))
        state.time += 60000;
    },
    decrement: (state) => {
    if (state.time > 60000)
      state.time -= 60000;
    },
    reset: (state) => {
      state.time = 300000;
    }
  },
});

export const { increment, decrement, reset } = breakSlice.actions;
export default breakSlice.reducer;