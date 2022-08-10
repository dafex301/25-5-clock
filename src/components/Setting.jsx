import React from 'react'
import { change_break, change_session } from '../slices/statusSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';


export default function Setting(props) {
  const status = useSelector(state => state.status.status);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    if (status !== 'START') {
      dispatch(props.incrementHandler());
      if (props.type === 'Session')
        dispatch(change_session());
      else
        dispatch(change_break())
    }
  }
  
  const handleDecrement = () => {
    if (status !== 'START') {
      dispatch(props.decrementHandler());
      if (props.type === 'Session')
        dispatch(change_session());
      else
        dispatch(change_break())
    }
  }

  return (
    <div className='text-white text-center'>
          <h3>{props.type}</h3>
          <div className='flex items-center justify-center gap-1'>
            <button onClick={handleDecrement}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <span> {props.display} </span>
            <button onClick={handleIncrement}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
  )
}
