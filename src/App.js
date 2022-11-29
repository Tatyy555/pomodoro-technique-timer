import { useEffect, useState } from "react";

function App() {
  const [breakTime, setBreakTime] = useState(3);
  const [sessionTime, setSessionTime] = useState(27);
  const [remainingTime, setRemainingTime] = useState(27 * 60);
  const [isSession, setIsSession] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAlarmOn, setIsAlarmOn] = useState(true);
  const [isBlackoutOn, setIsBlackoutOn] = useState(false);

  useEffect(() => {

    // It is not working...
    const goFullscreen = () =>{
      document.getElementById("fullscreen").requestFullscreen();
    }

    const timer = setTimeout(() => {
      const myAlarm = document.getElementById("beep");
      myAlarm.volume =  0.1;
      if (remainingTime && isPlaying) {
        setRemainingTime(remainingTime - 1);
        console.log(remainingTime);
      }
      if (!remainingTime && isPlaying) {
        if(isBlackoutOn)goFullscreen();
        setRemainingTime(breakTime * 60);
        setIsSession(false);
        isAlarmOn ? myAlarm.play(): console.log("alarm is off");
      }
      if (!remainingTime && !isSession) {
        setRemainingTime(sessionTime * 60);
        setIsSession(true);
        isAlarmOn ? myAlarm.play(): console.log("alarm is off");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [breakTime, isPlaying, isSession, remainingTime, sessionTime,isAlarmOn,isBlackoutOn]);

  const reset = () => {
    const myAlarm = document.getElementById("beep");
    myAlarm.volume =  0.1;
    isAlarmOn ? myAlarm.pause():console.log("alarm is off");
    isAlarmOn ? myAlarm.currentTime = 0:console.log("alarm is off");
    setIsPlaying(false);
    setIsSession(true);
    setBreakTime(3);
    setSessionTime(27);
    setRemainingTime(27 * 60);
  };

  const addBreakTime = () => {
    if (isPlaying || breakTime >= 60) return;
    setBreakTime(breakTime + 1);
  };

  const subtractBreakTime = () => {
    if (isPlaying || breakTime <= 1) return;
    setBreakTime(breakTime - 1);
  };

  const addSessionTime = () => {
    if (isPlaying || sessionTime >= 60) return;
    setSessionTime(sessionTime + 1);
    setRemainingTime(remainingTime + 1 * 60);
  };

  const subtractSessionTime = () => {
    if (isPlaying || sessionTime <= 1) return;
    setSessionTime(sessionTime - 1);
    setRemainingTime(remainingTime - 1 * 60);
  };

  const timeFormatter = () => {
    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime - min * 60;
    const formattedMin = min < 10 ? "0" + min : min;
    const formattedSec = sec < 10 ? "0" + sec : sec;
    return `${formattedMin}:${formattedSec}`;
  };

  const title = isSession ? "Session" : "Break";

  const startStop = () => {
    setIsPlaying(isPlaying ? false : true);
  };

  const alarmOnOff = () =>{
    if(!isAlarmOn){
      const myAlarm = document.getElementById("beep");
      myAlarm.pause();
      myAlarm.currentTime = 0; 
    }
    setIsAlarmOn(!isAlarmOn);
  }

  const blackoutOnOff = () =>{
    setIsBlackoutOn(!isBlackoutOn);
  }


  return (
    // Background
    <div className="h-screen w-screen bg-gradient-to-r from-emerald-500 to-lime-600 justify-center items-center flex flex-col">
      {/* Title */}
      <div className="text-white font-extralight text-5xl mb-3">
        Pomodoro Technique Timer
      </div>
      <div id="demo"></div>
      {/* Container */}
      <div className="bg-green-200 text-gray-600 rounded-xl  h-[400px] w-[600px] flex flex-col justify-center items-center space-y-4">
        {/* Top */}
        <div className=" w-[90%] h-[80px] flex justify-around">
          {/* Left Break */}
          <div className=" w-[45%] h-full flex flex-col justify-center text-center">
            <p id="break-label" className="text-2xl">
              Break Length
            </p>
            <div className="flex justify-center items-center space-x-3">
              <p
                id="break-decrement"
                className="text-2xl active:text-gray-300"
                onClick={subtractBreakTime}
              >
                ↓
              </p>
              <p id="break-length" className="text-2xl font-extrabold">
                {breakTime}
              </p>
              <p
                id="break-increment"
                className="text-2xl active:text-gray-300"
                onClick={addBreakTime}
              >
                ↑
              </p>
            </div>
          </div>
          {/* Right Session */}
          <div className=" w-[45%] h-full flex flex-col justify-center text-center">
            <p id="session-label" className="text-2xl">
              Session Length
            </p>
            <div className="flex justify-center items-center space-x-3">
              <p
                id="session-decrement"
                className="text-2xl active:text-gray-300"
                onClick={subtractSessionTime}
              >
                ↓
              </p>
              <p id="session-length" className="text-2xl font-extrabold">
                {sessionTime}
              </p>
              <p
                id="session-increment"
                className="text-2xl active:text-gray-300"
                onClick={addSessionTime}
              >
                ↑
              </p>
            </div>
          </div>
        </div>
        {/* Session */}
        <div id="fullscreen" className=" rounded-3xl bg-green-700 text-white w-[60%] h-[130px] flex flex-col justify-center items-center">
          <p id="timer-label" className="text-extrabold text-3xl">
            {title}
          </p>
          <p id="time-left" className="text-extrabold text-7xl">
            {timeFormatter()}
          </p>
        </div>
        {/* Button */}
        <div className=" w-[40%] h-[40px] flex justify-center items-center space-x-10">
          <p
            id="start_stop"
            className="  active:text-gray-300 "
            onClick={startStop}
          >
            <svg
              class="h-8 w-8 "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <polygon points="5 4 15 12 5 20 5 4" />{" "}
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </p>
          <p id="reset" className=" active:text-gray-300 " onClick={reset}>
            <svg
              class="h-8 w-8 "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <polyline points="23 4 23 10 17 10" />{" "}
              <polyline points="1 20 1 14 7 14" />{" "}
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </p>
        </div>
        {/* Options */}
        <div className=" w-full h-[70px] flex justify-around items-center">
          {/* Alarm Option */}
          <div className=" w-[120px] h-[60px] flex flex-col items-center justify-center">
            <p className="text-xl mb-1">Alarm Option</p>
            <label
              htmlFor="alarm-option"
              className="relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                value=""
                id="alarm-option"
                className="sr-only peer"
                checked={isAlarmOn}
                onClick={alarmOnOff}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          {/* Blackout Option */}
          <div className=" w-[150px] h-[60px] flex flex-col items-center justify-center">
            <p className="text-xl mb-1">Blackout Option</p>
{/* The blackout Option is not working */}
            <p className="m-0 text-sm">not working...</p>
            <label
              htmlFor="blackout-option"
              className="relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                value=""
                id="blackout-option"
                className="sr-only peer"
                checked={isBlackoutOn}
                onClick={blackoutOnOff}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <p className="text-white font-extralight text-center mt-3">
        Designed and Coded by Yamaguchi
      </p>
      <audio id="beep" src="Morning-alarm-sound-effect.mp3"></audio>
    </div>
  );
}

export default App;
