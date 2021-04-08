import React, { useState, useEffect } from "react";
import alarmSound from "../assets/alarm.mp3";
import clickSound from "../assets/click.mp3"

const alarm = new Audio(alarmSound);
const click = new Audio(clickSound);

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [label, setLabel] = useState("Focus time");
  const [session, setSession] = useState("focus");

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
  }, [isActive, minutes, seconds, label, session]);


  function toggle() {
    click.play();
    setIsActive(!isActive);
  }

  return (
    <section className="timer-box">
      <h1 className="session">{label}</h1>
      <div className="divider"></div>
      <div className="timer">
        <span className="countdown">
          {minutes}:{seconds}
        </span>
      </div>
      <button onClick={toggle}>{isActive ? "Pause" : "Start"}</button>
    </section>
  );
};

export default Timer;