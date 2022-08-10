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
    change_session: (state) => {
      state.status = 'CHANGE_SESSION';
    },
    change_break: (state) => {
      state.status = 'CHANGE_BREAK';
    }
  },
});

export const { start, pause, reset, change_session, change_break } = statusSlice.actions;
export default statusSlice.reducer;