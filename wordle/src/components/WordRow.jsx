import { React, useContext } from "react";
import { Context } from "../App";
import Letter from "./Letter";

import "./wordrow.css";

const WordRow = (props) => {
  const appState = useContext(Context);

  return (
    <div className="oneRow">
      {Object.entries(appState.state[props.rowId]).map( ([index, letter]) => {
        let letterStatus;

        if ( props.rowId >= appState.activeRow ) {
          letterStatus = '';
        } else if ( appState.state[props.rowId][index] === appState.dailyWord[index] ) {
          letterStatus = 'green';
        } else if ( appState.dailyWordAsString.includes( appState.state[props.rowId][index] ) ) {
          letterStatus = 'orange';
        } else {
          letterStatus = 'gray';
        }

        return (
          <Letter
            key={`${props.rowId} + ${index}` }
            value={ letter.toUpperCase() }
            status={ letterStatus }
          />
        );
      })}
    </div>
  );
};

export default WordRow;
