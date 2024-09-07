import { useEffect, useState, useCallback } from "react";
import "./style.css";

export default function Keyboard(props) {
  const letters = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const [color, setColor] = useState(
    letters
      .join("")
      .split("")
      .reduce((acc, letter) => {
        acc[letter] = undefined;
        return acc;
      }, {})
  );

  useEffect(() => {
    if (props.update) {
      for (let [l, newColor] of Object.entries(props.update)) {
  
        if (
          newColor === 1 ||
          (newColor === 0 && color[l] != 1) ||
          (newColor === -1 && color[l] === undefined)
        ) {
          setColor((prevColor) => ({
            ...prevColor,
            [l]: newColor,
          }));
        }
      }
    }
  }, [props.update]);


  const handleClick = useCallback(
    (e) => {
      let value;

      // Handle real keyboard (keydown) event
      value = e.key ? e.key : e.target.value;

      // Allow only letters, Enter, and Backspace
      if (
        (/[A-Z]/.test(value) && value.length === 1) ||
        value === "ENTER" ||
        value === "BACKSPACE"
      )
        props.handleLetterClick(value);
    },
    [props]
  );

  // Add event listener for real keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      handleClick({ key });
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener when the component unmounts
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClick]);

  const renderButton = (letter) => (
    <button
      className={`keyboard-button${
        letter.length > 1 ? " " + letter.toLowerCase() : ""
      }${
        color[letter] === 1
          ? " gn"
          : color[letter] === 0
          ? " yw"
          : color[letter] === -1
          ? " gy"
          : ""
      }`}
      id={letter}
      key={letter}
      name={letter}
      value={letter}
      onClick={handleClick}
    >
      {letter === "BACKSPACE" ? (
        <p className="fa fa-delete-left" />
      ) : (
        <p>{letter}</p>
      )}
    </button>
  );

  return (
    <div className="keyboard">
      {letters.slice(0, 2).map((row, i) => (
        <div className="keyboard-row" key={i}>
          {row.split("").map((letter) => renderButton(letter))}
        </div>
      ))}
      <div className="keyboard-row">
        {renderButton("ENTER")}
        {letters[2].split("").map((letter) => renderButton(letter))}
        {renderButton("BACKSPACE")}
      </div>
    </div>
  );
}
