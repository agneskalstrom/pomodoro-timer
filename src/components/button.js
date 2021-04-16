import React from "react";

const Button = (props) => {
    return (
        <button className="timer-button" onClick={props.event}>{props.buttonText}</button>
    );
}

export default Button;