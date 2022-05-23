import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import WordRow from "./components/WordRow";

export function App() {
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [activeRow, setActiveRow] = useState(0);
  const [wordArray, setWordArray] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [state, setState] = useState({
    0: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    1: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    2: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    3: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    4: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    5: { 0: "", 1: "", 2: "", 3: "", 4: "" },
  });

  const dailyWord = {
    0: "d",
    1: "r",
    2: "a",
    3: "i",
    4: "n",
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => onKeyDownHandler(e));
  }, [activeLetterIndex]);

  const onLegitKeyPress = (e) => {
    if (e.keyCode < 64 || e.keyCode > 91 || activeLetterIndex === 5) {
      return;
    }
    // setWordArray({ ...wordArray, ...{ [activeLetterIndex]: e.key } });
    // setState({ ...state[activeRow][activeLetterIndex], ...{ [activeLetterIndex]: e.key } });
    // setState(state=>({...state,...{state}[activeRow]}))    

    //The issue is somewhere here
    
    setState(state => ({ ...state, [activeRow]: { ...state[activeRow][activeLetterIndex], [activeLetterIndex]: e.key } }));
    console.log(state);
    setActiveLetterIndex(activeLetterIndex + 1);
  };

  const onBackspaceKeyPress = () => {
    if (activeLetterIndex === 0) {
      return;
    }

    deletionHelperFunc(activeRow, activeLetterIndex);
  };

  const deletionHelperFunc = (activeRow, activeLetterIndex) => {
    const mutatedStateCopy = JSON.parse(JSON.stringify(state));

    mutatedStateCopy[activeRow][activeLetterIndex - 1] = "";
    setActiveLetterIndex(activeLetterIndex - 1);
    setState(mutatedStateCopy);
  };

  const checkRow = () => {
    const dailyWordAsString = Object.values(dailyWord).join("");
    const guessedWordAsString = Object.values(state[activeRow]);
    if (dailyWordAsString === guessedWordAsString) {
      console.log("U guessed it");
      return;
    }
    setState({ ...state, ...{ [activeRow]: wordArray } });

    setActiveRow(activeRow + 1);
    setWordArray({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
    });
  };

  const onKeyDownHandler = (e) => {
    const eventKeycode = e.keyCode;
    switch (e.keyCode) {
      case 13:
        onEnterKeyPress();
        break;
      case 8:
        onBackspaceKeyPress();
        break;
      // case (e.keyCode > 64 && e.keyCode < 91):
      default:
        onLegitKeyPress(e);
        break;
    }
  };

  const onEnterKeyPress = () => {
    console.log("enter");
    if (activeLetterIndex !== 5) {
      return;
    }

    // setActiveRow(activeRow + 1)
    if (activeRow === 5) {
      return;
      // Stop the game and count as lost
    }
    checkRow();
  };

  const onLastRowEnter = () => {
    return;
  }; // Handle end of game

  return (
    <div className="App">
      <Context.Provider
        value={{
          wordArray,
          setWordArray,
          activeRow,
          activeLetterIndex,
          state,
        }}
      >
        <Header />

        <div className="board">
          {Object.keys(state).map((row, index) => (
            <WordRow key={index} id={index} isRowActive={index === activeRow} />
          ))}
        </div>
      </Context.Provider>
    </div>
  );
}
export const Context = createContext();

export default App;
