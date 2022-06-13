import React from "react";

import "./letter.css";

const Letter = (props) => {
  return (
    <div className="square">
        {props.value}
    </div>
  );
};

export default Letter;
