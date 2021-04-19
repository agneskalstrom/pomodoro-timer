import React from "react";

const Chevron = (props) => {
    return (
        <button name={props.name} className="chevron" onClick={props.event} aria-label={props.arialabel}>{props.buttonText}</button>
    );
}

export default Chevron;