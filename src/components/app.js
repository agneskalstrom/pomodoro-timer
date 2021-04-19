import React, { useState, useEffect } from "react";
import { formatTime } from "../utils";
import Button from "./button";
import Heading from "./heading";
import Chevron from "./chevron";
import alarmSound from "../assets/alarm.mp3";
import clickSound from "../assets/click.mp3";
import tomatoDark from "../assets/tomato-dark.svg";
import tomatoLight from "../assets/tomato-light.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
const tick = new Audio(clickSound);
const alarm = new Audio(alarmSound);

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
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
        } else {
          setSession("focus");
          setMinutes(25);
          setSeconds(0);
        }
      }
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, session]);

  function toggle() {
    tick.play();
    setIsActive(!isActive);
  }

  function changeTime(event) {
    tick.play();
    const name = event.target.name;
    if (name === "increment") {
      setMinutes(minutes + 1);
    } else if (name === "decrement") {
      setMinutes(minutes - 1);
    }
  }

  return (
    <main className={session === "focus" ? "focus-mode" : "break-mode"}>
      <div className="app-wrapper">
        <div className="timer-box">
          <Heading label={session === "focus" ? "Focus mode" : "Break mode"} />
          <div className="timer">
            <div className="chevron-wrapper">
              {isActive || minutes === 60 ? null : (
                <Chevron
                  name="increment"
                  event={changeTime}
                  buttonText={<FontAwesomeIcon icon={faChevronUp} />}
                  arialabel="Increase minute count"
                />
              )}
            </div>
            <span className="countdown">{formatTime(minutes, seconds)}</span>
            <div className="chevron-wrapper">
              {isActive || (minutes === 0 && seconds === 0) ? null : (
                <Chevron
                  name="decrement"
                  event={changeTime}
                  buttonText={<FontAwesomeIcon icon={faChevronDown} />}
                  arialabel="Decrease minute count"
                />
              )}
            </div>
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