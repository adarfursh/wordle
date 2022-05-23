import { React, useContext } from "react";
import { Context } from "../App";
import Letter from "./Letter";

import "./wordrow.css";

const WordRow = (props) => {
  const appState = useContext(Context);

  return (
    <div className="oneRow">
      {Object.keys(appState.state[props.id]).map((letter, index) => {
        return (
          <div onClick={() => console.log(appState.state[appState.activeRow][index] )}>
            <Letter
              key={index}
              id={index}
              value={
                props.isRowActive && index === appState.activeLetterIndex 
                  ? appState.state[appState.activeRow][index]
                  : undefined
              }
              rowId={props.id}
            />
            </div>
        );
      })}
    </div>
  );
};

export default WordRow;
