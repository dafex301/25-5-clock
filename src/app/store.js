import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from '../slices/sessionSlice';
import breakReducer from '../slices/breakSlice';


export default configureStore({
  reducer: {
    session: sessionReducer,
    break: breakReducer,
  },
})