import { React } from "react";
import { PieChart } from "react-minimal-pie-chart";

import "./modal.css";

export default function Modal(props) {
  return (
    <div className="modal">
      <h1>{props.isGameLost ? "You Lost" : "You Won! "}</h1>
      <div className="stats">
        <div> Games Played: {props.gamesPlayed} </div>
        <div> Games Won: {props.gamesWon}</div>
        <div> Games Lost: {props.gamesLost} </div>
        <div>
          <PieChart
            label={({ x, y, dx, dy, dataEntry }) => (
              <text

                dx={dx}
                dy={dy}
                // dominant-baseline="central"
                // textAnchor="left"
                style={{
                  fill: "#fff",
                  
                  fontSize: "0.4em",
                 
                }}
              >
                <tspan x={x} y={y} dx={dx} >
                  {dataEntry.title}
                </tspan>
                <tspan x={x} y={y + 5} dx={dx} dy={dy}>{`${Math.round(
                  dataEntry.value
                )}%`}</tspan>
              </text>
            )}
            data={[
              {
                title: "Won",
                value: parseInt(props.gamesWon),
                color: "#6aaa64",
              },
              {
                title: "Lost",
                value: parseInt(props.gamesLost),
                color: " #787c7e",
              },
            ]}
          />
          ;
        </div>
      </div>
    </div>
  );
}
