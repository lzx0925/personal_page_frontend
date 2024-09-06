import React, { useEffect, useCallback } from "react";
import "./style.css";

export default function Keyboard(props) {
  const keyboard = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  const handleClick = useCallback(
    (e) => {
      let name, value;

      // Handle real keyboard (keydown) event
      if (e.key) {
        name = e.key.toUpperCase();
        value = e.key.toUpperCase();
      }
      // Handle virtual keyboard (onClick) event
      else {
        name = e.target.name;
        value = e.target.value;
      }

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

  // Add event listener for real keyboard
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

  const renderButton = (letter, name = letter) => (
    <button
      className={`keyboard-button + ${
        name.length > 1 ? name.toLowerCase() : ""
      }`}
      id={letter}
      key={letter}
      name={letter.length > 1 ? letter.toUpperCase() : letter}
      value={letter}
      onClick={handleClick}
    >
      <p>{name}</p>
    </button>
  );

  return (
    <div className="keyboard">
      {keyboard.slice(0, 2).map((row, i) => (
        <div className="keyboard-row" key={i}>
          {row.split("").map((letter) => renderButton(letter))}
        </div>
      ))}
      <div className="keyboard-row">
        {renderButton("Enter", "Enter")}
        {keyboard[2].split("").map((letter) => renderButton(letter))}
        {renderButton("Backspace", "Del")}
      </div>
    </div>
    // return (
    //   <div className="keyboard">
    //     <div className="keyboard-row" id="row1" key="row1">
    //       {keyboard[0].split("").map((letter) => (
    //         <button
    //           className="keyboard-button"
    //           type="button"
    //           id={letter}
    //           key={letter}
    //           name={letter}
    //           value={letter}
    //           onClick={handleClick}
    //         >
    //           {letter}
    //         </button>
    //       ))}
    //     </div>
    //     <div className="keyboard-row" id="row2" key="row2">
    //       {keyboard[1].split("").map((letter) => (
    //         <button
    //           className="keyboard-button"
    //           type="button"
    //           id={letter}
    //           key={letter}
    //           name={letter}
    //           value={letter}
    //           onClick={handleClick}
    //         >
    //           {letter}
    //         </button>
    //       ))}
    //     </div>
    //     <div className="keyboard-row" id="row3" key="row3">
    //       <button
    //         className="keyboard-button submit"
    //         name="Enter"
    //         value="Enter"
    //         onClick={handleClick}
    //       >
    //         Enter
    //       </button>
    //       {keyboard[2].split("").map((letter) => (
    //         <button
    //           className="keyboard-button"
    //           type="button"
    //           id={letter}
    //           key={letter}
    //           name={letter}
    //           value={letter}
    //           onClick={handleClick}
    //         >
    //           {letter}
    //         </button>
    //       ))}
    //       <button
    //         className="keyboard-button delete"
    //         name="Backspace"
    //         value=""
    //         onClick={handleClick}
    //       >
    //         Del
    //       </button>
    //     </div>
    //   </div>
  );
}
