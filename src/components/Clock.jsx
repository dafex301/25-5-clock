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
    <div className='flex flex-col items-center justify-center h-screen'>
      <div>
        <h1 className='text-3xl text-white font-semibold text-center'>25 + 5 Clock</h1>
      </div>
      <div className='bg-white my-3 flex-col text-center p-3 rounded-lg shadow-lg'>
        <div className='text-sky-600'>Session</div>
        <div className='text-5xl text-sky-600'>25:00</div>
      </div>
      <div className='flex'>
        <div className='text-white'>
          <h3>Session</h3>
          <button onClick={() => dispatch(incrementSession())}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <span> {sessionTime} </span>
          <button onClick={() => dispatch(decrementSession())}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className='text-white'>
          <h3>Break</h3>
          <button onClick={() => dispatch(incrementBreak())}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <span> {breakTime} </span>
          <button onClick={() => dispatch(decrementBreak())}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
