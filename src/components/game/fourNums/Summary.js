import "./style.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Summary(props) {
  const [newGame, setNewGame] = useState(
    (props.status !== 24 && props.chance !== 0) || props.status === "help"
      ? false
      : true
  );
  function getMessage() {
    if (props.status === "help") {
      const instructions = [
        "24 Points will present you with four  cards with numbers on them, along with an expression box.",
        "Drag cards, symbols to the specific boxes on the game board until you have created an equation that evaluates to 24.",
        "If you want to use parentheses (), drag them to the symbol box and assign the desired symbol to them by dragging the symbol to the box as well.",
        "Click on box to remove what you already dragged into.",
        "You have five chances to create a valid equation.",
        "You can choose to play again or exit the game after completing a game.",
        "Hope these instructions help you to enjoy playing the game 24 Points!",
      ];
      let components = [];
      for (let i in instructions) {
        components.push(<div className="instruction">{instructions[i]}</div>);
      }
      return components;
    } else if (props.chance === 0 || props.status === 24) {
      //win total percent
      return "Win Rate:" + props.gameData;
    } else {
      //chance
      return "You still have " + props.chance + " chances to win!!";
    }
  }

  function reGame() {
    console.log("ew game");
  }

  return (
    <div className="summary-container fournums">
      <div className="title">
        {props.status == "help"
          ? "How to Play?"
          : props.status === 24
          ? "Win!!"
          : props.chance === 0
          ? "Lose..."
          : "More Chance to Try!"}
      </div>
      <div className="message">{getMessage()}</div>
      {newGame ? (
        <button className="new-game-button" onClick={props.resetHandler}>
          New Play
        </button>
      ) : (
        <button className="back-button" onClick={props.closeWarning}>
          {newGame || props.status === "help" ? "Back" : "Try Again"}
        </button>
      )}
    </div>
  );
}
