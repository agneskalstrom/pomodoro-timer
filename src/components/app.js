import React, { useState, useEffect } from "react";
import alarmSound from "../assets/alarm.mp3";
import clickSound from "../assets/click.mp3";
import tomatoDark from "../assets/tomato-dark.svg";
import tomatoLight from "../assets/tomato-light.svg";
import Info from "./info";

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [session, setSession] = useState("focus");
  const [label, setLabel] = useState("Focus time");
  const [displayInfo, setDisplayInfo] = useState(false);

  function formatTime() {
    let min = minutes;
    let sec = seconds;
    if (sec < 10) {
      sec = `0${seconds}`;
    }
    if (min < 10) {
      min = `0${minutes}`;
    }
    return `${min}:${sec}`;
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      if (seconds < 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      }
      if (isActive && minutes === 0 && seconds < 0) {
        const alarm = new Audio(alarmSound);
        alarm.play();
        setIsActive(false);
        if (session === "focus") {
          setSession("break");
          setMinutes(5);
          setSeconds(0);
          setLabel("Break time");
        } else {
          setSession("focus");
          setMinutes(25);
          setSeconds(0);
          setLabel("Focus time");
        }
      }
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, session]);

  function toggle() {
    const click = new Audio(clickSound);
    click.play();
    setIsActive(!isActive);
  }

  function toggleInfo() {
    setDisplayInfo(!displayInfo);
  }

  return (
    <main className={session === "focus" ? "focus-mode" : "break-mode"}>
      <div className="toggle">
        <button className="toggle-button" onClick={toggleInfo}>
          {displayInfo ? "X" : "?"}
        </button>
      </div>
      <div className="app-wrapper">
        <div className="timer-box">
          <h1>{label}</h1>
          <div className="divider"></div>
          <div className="timer">
            <span className="countdown">{formatTime()}</span>
          </div>
          <button onClick={toggle} className="timer-button">
            {isActive ? "Pause" : "Start"}
          </button>
        </div>
        {displayInfo ? <Info /> : ""}
      </div>
      <div className="img-container">
        <img src={session === "focus" ? tomatoDark : tomatoLight} className="tomato" alt="Drawing of a tomato" />
      </div>
    </main>
  );
};

export default App;
