import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from '../slices/sessionSlice';
import breakReducer from '../slices/breakSlice';
import statusReducer from '../slices/statusSlice';


export default configureStore({
  reducer: {
    session: sessionReducer,
    break: breakReducer,
    status: statusReducer,
  },
})