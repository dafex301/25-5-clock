import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    time: 60000 * 25,
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
      state.time = 60000 * 25;
    }
  },
});

export const { increment, decrement, reset } = sessionSlice.actions;
export default sessionSlice.reducer;