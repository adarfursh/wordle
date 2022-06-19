import React from "react";
import "./modal.css";

export default function Modal(props) {
  return (
    <div className="modal">
      {props.isGameLost ? "You Lost" : "You Won! "}
      {localStorage.getItem("Games Won ") !== null &&
      localStorage.getItem("Games Lost ") !== null
        ? "You have played this game " + props.gamesPlayed + " times. You have " + props.gamesWon + " wins and " + props.gamesLost+ " losses overall."
        : ""}
        
    </div>
  );
}
