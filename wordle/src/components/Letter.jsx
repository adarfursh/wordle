import React, { useContext } from "react";
import { Context } from "../App";

import "./letter.css";

const Letter = (props) => {
  const appState = useContext(Context);

  return (
    <div maxLength="1" className="square" >
      {/* {props.id === appState.activeLetterIndex ?props.value:'no'} */}
{/* 
      {appState.activeRow == props.rowId 
        ? props.value
        : ""} */}
        {props.value}
    </div>
  );
};

export default Letter;
