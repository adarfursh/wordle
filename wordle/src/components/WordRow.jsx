import { React, useContext } from "react";
import { Context } from "../App";
import Letter from "./Letter";

import "./wordrow.css";

const WordRow = (props) => {
  const appState = useContext(Context);



  return (
    <div className="oneRow">
      {Object.entries(appState.state[props.id]).map( ([index, letter]) => {
        
        return (
          <Letter
            key={`${props.id} + ${index}` }
            value={ letter.toUpperCase() }
          />
        );
      })}
    </div>
  );
};

export default WordRow;
