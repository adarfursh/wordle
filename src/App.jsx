import React, { useState, useEffect, createContext, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import WordRow from "./components/WordRow";
import Modal from "./components/Modal";
import { WordArray } from "./components/WordArray";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export function App() {
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [activeRow, setActiveRow] = useState(0);
  const [dailyWordAsString, setDailyWordAsString] = useState("");

  // const [input, setInput] = useState("");
  // const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  const [state, setState] = useState({
    0: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    1: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    2: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    3: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    4: { 0: "", 1: "", 2: "", 3: "", 4: "" },
    5: { 0: "", 1: "", 2: "", 3: "", 4: "" },
  });

  const [dailyWord, setDailyWord] = useState();

  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);

  const onKeyPress = (e) => {
    let virtualKey = e.toUpperCase();
    let keycode = virtualKey.charCodeAt(0);

    switch (virtualKey) {
      case "{ENTER}":
        onEnterKeyPress();
        break;
      case "{BKSP}":
        onBackspaceKeyPress();
        break;
      default:

    }

    //Input on virtual keyboard is lower case by default. To get accurate keycode I had to use toUpperCase.
    if (keycode < 64 || keycode > 91 || activeLetterIndex === 5) {
      return;
    } else {
      setState((state) => {
        const newWordState = {
          ...state[activeRow],
          ...{ [activeLetterIndex]: e },
        };

        return { ...state, ...{ [activeRow]: newWordState } };
      });
      setActiveLetterIndex(activeLetterIndex + 1);
    }
  };


  // Set daily word
  useEffect(() => {
    const lowerCased = WordArray.map((word) => word.toLowerCase());

    let randomChosenWord =
      lowerCased[Math.floor(Math.random() * lowerCased.length)].split("");

    let objRandom = Object.assign({}, randomChosenWord);
    let joinedWord = Object.values(objRandom).join("");
    setDailyWordAsString(joinedWord);
    setDailyWord(objRandom);
    return () => {};
  }, []);
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
  useEffect(() => {
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
            state={state}
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
            <Keyboard
              keyboardRef={(r) => (keyboard.current = r)}
              // layoutName={layout}
              // onChange={onChange}
              onKeyPress={onKeyPress}
              excludeFromLayout={{
                default: [
                  "`",
                  "@",
                  ".com",
                  "{shift}",
                  "{lock}",
                  "{tab}",
                  "-",
                  "=",
                  ";",
                  "[",
                  "]",
                  "'",
                  ",",
                  ".",
                  "/",
                  "\\",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "0",
                ],
              }}
            />
          </div>
        )}
      </Context.Provider>
    </div>
  );
}
export const Context = createContext();

export default App;
