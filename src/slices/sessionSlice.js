import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    time: 25,
  },
  reducers: {
    increment: (state) => {
      state.time += 1;
    },
    decrement: (state) => {
      state.time -= 1;
    },
  },
});

export const { increment, decrement } = sessionSlice.actions;
export default sessionSlice.reducer;