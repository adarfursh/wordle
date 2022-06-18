import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import WordRow from "./components/WordRow";

export function App() {
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [activeRow, setActiveRow] = useState(0);

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
    const onKeyDownHandler = (e) => {
      //Restrict to English
      switch (e.keyCode) {
        case 13:
          onEnterKeyPress();
          break;
        case 8:
          onBackspaceKeyPress();
          break;
        default:
          onLegitKeyPress(e);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDownHandler);

    return () => window.removeEventListener("keydown", onKeyDownHandler);
  });

  const onLegitKeyPress = (e) => {
    if (e.keyCode < 64 || e.keyCode > 91 || activeLetterIndex === 5) {
      return;
    }

    setState((state) => {
      const newWordState = {
        ...state[activeRow],
        ...{ [activeLetterIndex]: e.key },
      };

      return { ...state, ...{ [activeRow]: newWordState } };
    });

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
    setActiveRow(activeRow + 1);
  };
  //Check matching letters between objects

  const guessValues = Object.values(state[activeRow]);
  const dailyWordValues = Object.values(dailyWord);

  const compareWords = (object1, object2) => {
    for (let index = 0; index < object1.length; index++) {
      console.log(object1[index]);
      for (let j = 0; j < object2.length; j++) {
        // if (condition) {
        //   console.log(object2[index]);
        // }
      }
    }
  };

  const onEnterKeyPress = () => {
    const lettersAsArray = Object.values(state[activeRow]).every(
      (value) => value !== ""
    );
    if (lettersAsArray === true) {
      const currentWord = state[activeRow];
      const stringDailyWord = JSON.stringify(dailyWord);
      const stringCurrentRow = JSON.stringify(currentWord);
      if (stringDailyWord === stringCurrentRow) {

      } else {
        compareWords(dailyWordValues, guessValues);
        setActiveRow(activeRow + 1);
        setActiveLetterIndex(0);
      }

      if (activeRow === 5) {
        setTimeout(() => {
          console.log("Sorry but you lost");
        }, 1000);
        //Temp solution to adding extra rows
        document.location.reload();
      }
      checkRow();
    }
  };

  return (
    <div className="App">
      <Context.Provider
        value={{
          activeRow,
          activeLetterIndex,
          state,
          dailyWord,
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
