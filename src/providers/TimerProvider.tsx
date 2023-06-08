import { useState, useEffect } from "react";
import { TimerContext } from "../context/useTimer";
import { useNotification } from "../hooks/useNotification";

interface TimerProviderProps {
  children: React.ReactNode;
}
export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const init = 1500;
  const [sets, setSets] = useState(7); // Number of sets
  const [circ, setCirc] = useState(init);
  const [currentSet, setCurrentSet] = useState(1);
  const [time, setTime] = useState<number>(init); // Initial time in seconds (25 minutes)
  const [isActive, setIsActive] = useState(false); // Duration of the pause between sets in seconds (5 minutes)

  useEffect(() => {
    let interval: number | NodeJS.Timer;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      // Switch to the next set when the current set finishes
      if (
        (currentSet == 1 || currentSet == 3 || currentSet == 5) &&
        currentSet < sets
      ) {
        if (currentSet == 3) {
          setCurrentSet((prevSet) => prevSet + 1);
          setTime(900);
          setCirc(900);
        } else {
          setCurrentSet((prevSet) => prevSet + 1);
          setTime(300);
          setCirc(300);
        }
      } else if (currentSet < sets) {
        setCurrentSet((prevSet) => prevSet + 1);
        setTime(init);
        setCirc(init);

        // Reset time to initial value
      } else {
        setIsActive(false); // All sets finished, stop the timer
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time, currentSet, sets]);
  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setCurrentSet(1); // Reset to the first
    setTime(init);
    setCirc(init); // Reset time to initial value
    setIsActive(false);
    
  };
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timerContextValue = {
    sets,
    currentSet,
    time,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    formatTime,
    circ
  };

  return (
    <TimerContext.Provider value={timerContextValue}>
      {children}
    </TimerContext.Provider>
  );
};