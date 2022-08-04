import React from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { 
  decrement as decrementSession, 
  increment as incrementSession } 
    from '../slices/sessionSlice';
import { 
  decrement as decrementBreak, 
  increment as incrementBreak } 
    from '../slices/breakSlice';


export default function Clock() {
  const sessionTime = useSelector(state => state.session.time)
  const breakTime = useSelector(state => state.break.time)
  const dispatch = useDispatch();

  return (
    <div>
      <h1>25 + 5 Clock</h1>
      <p>{sessionTime}</p>
      <button onClick={() => dispatch(incrementSession)}>
        Increment Session
      </button>
      <button onClick={() => dispatch(decrementSession)}>
        Decrement Session
      </button>
      <p>{breakTime}</p>
      <button onClick={() => dispatch(incrementBreak)}>
        Increment Break
      </button>
      <button onClick={() => dispatch(decrementBreak)}>
        Decrement Break
      </button>
    </div>
  )
}
