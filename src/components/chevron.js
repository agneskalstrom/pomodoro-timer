import React from "react";

const Chevron = (props) => {
    return (
        <button name={props.name} className="chevron" onClick={props.event}>{props.buttonText}</button>
    );
}

export default Chevron;