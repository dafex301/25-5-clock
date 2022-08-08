import { createSlice } from '@reduxjs/toolkit';

export const statusSlice = createSlice({
  name: 'status',
  initialState: {
    status: 'DEFAULT',
  },
  reducers: {
    start: (state) => {
      state.status = 'START';
    },
    pause: (state) => {
      state.status = 'PAUSE';
    },
    reset: (state) => {
      state.status = 'DEFAULT';
    },
    change: (state) => {
      state.status = 'CHANGE';
    }
  },
});

export const { start, pause, reset, change } = statusSlice.actions;
export default statusSlice.reducer;