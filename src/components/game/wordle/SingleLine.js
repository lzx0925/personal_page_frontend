import "./style.css";
import { useState, useEffect } from "react";

export default function SingleLine(props) {
  function generateOneLine() {
    let words = [];
    for (let i = 0; i < 5; i++) {
      words.push(
        <div className="word" name={i} key={i}>
          <div className="letter-text"></div>
        </div>
      );
    }
    return words;
  }

  return (
    <div className="words" id={props.line}>
      {generateOneLine()}
    </div>
  );
}
