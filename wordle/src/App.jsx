import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import WordRow from "./components/WordRow";
import Modal from "./components/Modal";

export function App() {
  // const dailyWord = {
  //   0: "d",
  //   1: "r",
  //   2: "a",
  //   3: "i",
  //   4: "n",
  // };
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [activeRow, setActiveRow] = useState(0);
  const [dailyWordAsString, setDailyWordAsString] = useState("");

  const [state, setState] = useState({
    0: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    1: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    2: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    3: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    4: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    5: { 0: "", 1: "", 2: "", 3: "", 4: "" },
  });

  const wordsArray = ["drain", "stain", "train", "house"];
  const [dailyWord, setDailyWord] = useState();

  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);

  // Set daily word
  useEffect(() => {
    let randomChosenWord =
      wordsArray[Math.floor(Math.random() * wordsArray.length)].split("");
    let objRandom = Object.assign({}, randomChosenWord);
    setDailyWordAsString(Object.values(objRandom).join(""));
    setDailyWord(objRandom);
    return () => {};
  }, []);

  useEffect(() => {
    const onKeyDownHandler = (e) => {
      if (!/[a-zA-Z]/.test(e.key)) {
        return;
      }

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
    const guessedWordAsString = Object.values(state[activeRow]).join("");

    if (Object.values(dailyWord).join("") === guessedWordAsString) {
      setTimeout(() => {
        setIsGameWon(true);
        if (localStorage.getItem("Games Won") === null) {
          localStorage.setItem("Games Won", 1);
        } else {
          localStorage.setItem(
            "Games Won",
            parseInt(localStorage.getItem("Games Won")) + 1
          );
        }
        addToPlayedGamesAmmount();
      }, 250);
      return;
    }
    setActiveRow(activeRow + 1);
  };

  const addToPlayedGamesAmmount = () => {
    if (localStorage.getItem("Games Played") === null) {
      localStorage.setItem("Games Played", 1);
    } else {
      localStorage.setItem(
        "Games Played",
        parseInt(localStorage.getItem("Games Played")) + 1
      );
    }
  };
  const onEnterKeyPress = () => {
    const lettersAsArray = Object.values(state[activeRow]).every(
      (value) => value !== ""
    );

    if (lettersAsArray === true) {
      checkRow();

      const currentWord = state[activeRow];
      const stringDailyWord = JSON.stringify(dailyWord);
      const stringCurrentRow = JSON.stringify(currentWord);
      if (stringDailyWord === stringCurrentRow) {
      } else {
        // compareWords(Object.values(dailyWord), state[activeRow]);
        setActiveRow(activeRow + 1);
        setActiveLetterIndex(0);
      }

      if (activeRow === 5) {
        setTimeout(() => {
          setIsGameLost(true);
          if (localStorage.getItem("Games Lost") === null) {
            localStorage.setItem("Games Lost", 1);
          } else {
            localStorage.setItem(
              "Games Lost",
              parseInt(localStorage.getItem("Games Lost")) + 1
            );
          }
          addToPlayedGamesAmmount();
        }, 250);
      }
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
          dailyWordAsString,
        }}
      >
        <Header />

        {isGameWon || isGameLost ? (
          <Modal
            isGameLost={isGameLost}
            gamesPlayed={localStorage.getItem("Games Played")}
            gamesLost={localStorage.getItem("Games Lost")}
            gamesWon={localStorage.getItem("Games Won")}
          />
        ) : (
          <div className="board">
            {Object.keys(state).map((row, index) => (
              <WordRow
                key={index}
                rowId={index}
                isRowActive={index === activeRow}
              />
            ))}
          </div>
        )}
      </Context.Provider>
    </div>
  );
}
export const Context = createContext();

export default App;
