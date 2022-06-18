import React from "react";
import "./modal.css";

export default function Modal(props) {

  return (
    <div className="modal">
          {props.isGameLost ? 'You Lost' : 'You Won'}
    </div>
  );
}
