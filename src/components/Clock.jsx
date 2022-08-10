import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { 
  decrement as decrementSession, 
  increment as incrementSession,
  reset as resetSession, } 
    from '../slices/sessionSlice';
import { 
  decrement as decrementBreak, 
  increment as incrementBreak,
  reset as resetBreak, }
    from '../slices/breakSlice';
import Setting from './Setting';
import { start, pause, reset } from '../slices/statusSlice';

// Sound
import useSound from 'use-sound';
import { getRandomAudio } from '../functions/audio';

// Functions
import { convertMiliToMinute } from '../functions/convertMiliToMinute';

let music = getRandomAudio();

export default function Clock() {
  // Redux Store
  const sessionTime = useSelector(state => state.session.time)
  const breakTime = useSelector(state => state.break.time)
  const status = useSelector(state => state.status.status)
  const dispatch = useDispatch();

  // Timer
  const [timer, setTimer] = React.useState(sessionTime);
  const [isSession, setIsSession] = React.useState(true);
  const [count, setCount] = React.useState(0);

  // Sound
  const [play] = useSound(music);

  const handleStart = () => {
    dispatch(start());
  }

  const handlePause = () => {
    dispatch(pause());
  }

  const handleReset = () => {
    dispatch(reset());
    dispatch(resetBreak());
    dispatch(resetSession());
    setIsSession(true);
    setTimer(sessionTime);
  }
  
  // handle key press when space entered, start the timer
  const handleKeyPress = e => {
    if (e.key === ' ' && status !== 'START') handleStart();
    else if (e.key === ' ' && status === 'START') handlePause();
    else if (e.key === 'r' || e.key === 'R') handleReset();
  }

  // Key press
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  })

  // Update the timer when handleStart fired
  useEffect(() => {
    if (status === 'START' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1000);
        // When the timer is 0, change the timer to break/session time
        if (timer === 1000) {
          setIsSession(!isSession)
          // If the timer is session time, reset the timer to break time
          // And vice versa
          setTimer(isSession ? breakTime : sessionTime);
          // Also count how many sessions have been done
          setCount(isSession ? count + 1 : count);
          // Audio
          music = getRandomAudio();
          play();
        }
      }
      , 1000);
      return () => clearInterval(interval);
    }

    // Update the timer when sessionTime is changed
    if (status === 'DEFAULT') {
      setTimer(isSession ? sessionTime : breakTime);
    }

    // if the status is pause and the sessionTime or breakTime is changed, 
    // to the new value set the timer 
    if (status === 'CHANGE_BREAK' && !isSession) {
      setTimer(breakTime);
    }  

    if (status === 'CHANGE_SESSION' && isSession) {
      setTimer(sessionTime);
    }
  }
  , [breakTime, count, isSession, play, sessionTime, status, timer]);

  return (
    <div className='flex flex-col items-center justify-center h-screen drop-shadow-lg transition-all'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl text-white font-semibold text-center'>25 + 5 Clock</h1>
      </div>
      <div className={
        timer >= 60000 
      ? 'text-sky-600 bg-white my-3 flex-col text-center p-3 rounded-lg shadow-md ' 
      : 'text-red-600 bg-white my-3 flex-col text-center p-3 rounded-lg shadow-md '}>
        <div className=''>{isSession ? 'Session' : 'Break'}</div>
        <div className='text-5xl '>{convertMiliToMinute(timer)}</div>
      </div>

      <div>
        {count > 0 && <p className='text-white drop-shadow-md mb-3'>Session {count}</p>}
      </div>

      <div className='flex gap-3'>
      {/* Start and Pause Button */}
      {status !== 'START' ? 
        <button onClick={handleStart}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-play text-white w-10" viewBox="0 0 16 16">
          <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
          </svg>
        </button> : 
        <button  onClick={handlePause}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pause text-white w-10" viewBox="0 0 16 16">
            <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
          </svg>
        </button>
        }

        {/* Reset Button */}
        <button onClick={handleReset}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-repeat w-8 text-white" viewBox="0 0 16 16">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
          <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
        </svg>
        </button>
        {/* End of Reset */}

      </div>
      <div className='flex items-center justify-center gap-4'>
        <Setting 
        type='Session'
        incrementHandler={incrementSession} 
        decrementHandler={decrementSession}
        display={convertMiliToMinute(sessionTime, 'minute')}
        />
        <Setting 
        type='Break'
        incrementHandler={incrementBreak} 
        decrementHandler={decrementBreak}
        display={convertMiliToMinute(breakTime, 'minute')}
        />
      </div>
      <a href="https://github.com/dafex301" 
      className='text-center text-white text-sm mt-7 opacity-70 hover:opacity-90 flex gap-2 items-center justify-center'
      target='_blank' rel="noreferrer">
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 496 512" 
        className='text-white w-4'>
          <path 
          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
        </div>
        <div>
          dafex301
        </div>
      </a>
    </div>
  )
}
