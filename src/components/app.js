import React, { useState, useEffect } from "react";
import Button from "./button";
import Heading from "./heading";
import Chevron from "./chevron";
import alarmSound from "../assets/alarm.mp3";
import clickSound from "../assets/click.mp3";
import tomatoDark from "../assets/tomato-dark.svg";
import tomatoLight from "../assets/tomato-light.svg";

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [session, setSession] = useState("focus");

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
      }, 10);
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
        } else {
          setSession("focus");
          setMinutes(25);
          setSeconds(0);
        }
      }
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, session]);

  const click = new Audio(clickSound);

  function toggle() {
    click.play();
    setIsActive(!isActive);
  }

  function increase() {
    click.play();
    setMinutes(minutes + 1);
  }

  function decrease() {
    click.play();
    setMinutes(minutes - 1);
  }

  return (
    <main className={session === "focus" ? "focus-mode" : "break-mode"}>
      <div className="app-wrapper">
        <div className="timer-box">
          <Heading label={session === "focus" ? "Focus mode" : "Break mode"} />
          <div className="timer">
            <Chevron event={increase} buttonText="▲"/>
            <span className="countdown">{formatTime()}</span>
            <Chevron event={decrease} buttonText="▼" />
          </div>
          <Button event={toggle} buttonText={isActive ? "Pause" : "Start"} />
        </div>
        <div className="img-container">
          <img
            src={session === "focus" ? tomatoDark : tomatoLight}
            className="tomato"
            alt="Drawing of a tomato"
          />
        </div>
      </div>
    </main>
  );
};

export default App;
