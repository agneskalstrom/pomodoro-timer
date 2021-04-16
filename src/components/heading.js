import React from "react";

const Heading = (props) => {
  return (
    <div className="heading">
      <h1>{props.label}</h1>
      <div className="divider"></div>
    </div>
  );
};

export default Heading;
