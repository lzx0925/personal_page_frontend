import React from "react";
import "./style.css";
import { useEffect, useCallback } from "react";

export default function Keyboard(props) {
  const keyboard = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const handleClick = (e) => {
    props.changeTextLetter(e.target.name, e.target.value);
  };

  return (
    <div className="keyboard">
      <div className="keyboard-row" id="row1" key="row1">
        {keyboard[0].split("").map((letter) => (
          <button
            className="keyboard-button"
            type="button"
            id={letter}
            key={letter}
            name={letter}
            value={letter}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="keyboard-row" id="row2" key="row2">
        {keyboard[1].split("").map((letter) => (
          <button
            className="keyboard-button"
            type="button"
            id={letter}
            key={letter}
            name={letter}
            value={letter}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="keyboard-row" id="row3" key="row3">
        <button
          className="keyboard-button submit"
          name="Enter"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Enter
        </button>
        {keyboard[2].split("").map((letter) => (
          <button
            className="keyboard-button"
            type="button"
            id={letter}
            key={letter}
            name={letter}
            value={letter}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            {letter}
          </button>
        ))}
        <button
          className="keyboard-button delete"
          name="Backspace"
          value=""
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Del
        </button>
      </div>
    </div>
  );
}
