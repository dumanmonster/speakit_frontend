import React, { createContext, useState, useEffect, useContext } from "react";
interface TimerContextType {
  sets: number;
  currentSet: number;
  time: number;
  circ: number;
  isActive: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  formatTime: (timeInSeconds: number) => string;
}
const TimerContext = createContext<TimerContextType | undefined>(undefined);


const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }

  return context;
};
export { TimerContext, useTimer };
