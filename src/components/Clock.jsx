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
  const [play, { stop, isPlaying }] = useSound(music);

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

  // Update the timer when handleStart fired
  useEffect(() => {
    if (status === 'START' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1000);
        // Play music
        if (timer === 2000) {
          music = getRandomAudio();
          console.log('use-effect : ' + music);
          play();
        }
        // When the timer is 0, change the timer to break/session time
        if (timer === 1000) {
          setIsSession(!isSession)
          // If the timer is session time, reset the timer to break time
          // And vice versa
          setTimer(isSession ? breakTime : sessionTime);
          // Also count how many sessions have been done
          setCount(isSession ? count : count + 1);
        }
      }
      , 1000);
      return () => clearInterval(interval);
    }
  }
  , [breakTime, count, isSession, play, sessionTime, status, timer]);

  // Update the timer when sessionTime is changed
  useEffect(() => {
    if (status === 'DEFAULT') {
      setTimer(isSession ? sessionTime : breakTime);
    }
    // if the status is pause and the sessionTime or breakTime is changed, 
    // to the new value set the timer 
    if (status === 'CHANGE' && timer !== (isSession ? sessionTime : breakTime)) {
      setTimer(isSession ? sessionTime : breakTime);
    }
  }
  , [breakTime, isSession, sessionTime, status, timer]);

  return (
    <div className='flex flex-col items-center justify-center h-screen drop-shadow-lg'>
      <div>
        <h1 className='text-3xl text-white font-semibold text-center'>25 + 5 Clock</h1>
      </div>
      <div className={
        timer >= 60000 
      ? 'text-sky-600 bg-white my-3 flex-col text-center p-3 rounded-lg shadow-md ' 
      : 'text-red-600 bg-white my-3 flex-col text-center p-3 rounded-lg shadow-md '}>
        <div className=''>{isSession ? 'Session' : 'Break'}</div>
        <div className='text-5xl '>{convertMiliToMinute(timer)}</div>
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
    </div>
  )
}
