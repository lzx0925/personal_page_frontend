import React, { useEffect, useCallback } from "react";
import "./style.css";

export default function Keyboard(props) {
  const keyboard = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  const handleClick = useCallback(
    (e) => {
      const value = e.target ? e.target.value : e.key.toUpperCase();
      const name = e.target ? e.target.name : e.key;

      // Allow only letters, Enter, and Backspace
      if (
        (/[A-Z]/.test(name) && name.length === 1) ||
        name === "ENTER" ||
        name === "BACKSPACE"
      ) {
        props.handleLetterClick(name, value);
      }
    },
    [props]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      handleClick({ key });
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClick]);

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
            onClick={handleClick}
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
            onClick={handleClick}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="keyboard-row" id="row3" key="row3">
        <button
          className="keyboard-button submit"
          name="Enter"
          value="Enter"
          onClick={handleClick}
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
            onClick={handleClick}
          >
            {letter}
          </button>
        ))}
        <button
          className="keyboard-button delete"
          name="Backspace"
          value=""
          onClick={handleClick}
        >
          Del
        </button>
      </div>
    </div>
  );
}
