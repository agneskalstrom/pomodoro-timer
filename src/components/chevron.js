import React from "react";

const Chevron = (props) => {
    return (
        <button className="chevron" onClick={props.event}>{props.buttonText}</button>
    );
}

export default Chevron;