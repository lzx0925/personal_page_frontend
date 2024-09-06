import "./style.css";
import { useState, useEffect } from "react";
import Keyboard from "./Keyboard.js";

import Summary from "./Summary";
import SingleLine from "./SingleLine.js";
import { check_wordle } from "../../../services/wordle.js";

export default function Wordle() {
  const [curLine, setCurLine] = useState(0);
  const [words, setWord] = useState(["", "", "", "", "", ""]);
  const [summary, setSummary] = useState(null);
  const [res, setRes] = useState();
  const [keyboard, setKeyboard] = useState();

  async function handleKeyBoardClick(name, value) {
    const newWords = [...words];

    if (name === "ENTER" && words[curLine].length === 5) {
      const res = await check_wordle(words[curLine]);
      const data = res.data;

      setRes(data.result);
      setKeyboard(data.keyboard);
      setTimeout(() => (curLine < 5 ? setCurLine(curLine + 1) : null), 2000);
    } else if (name === "BACKSPACE" && words[curLine].length > 0) {
      document.getElementById(curLine).children[
        words[curLine].length - 1
      ].children[0].textContent = "";
      newWords[curLine] = newWords[curLine].slice(0, -1);
    } else if (name.length === 1 && words[curLine].length < 5) {
      document.getElementById(curLine).children[
        words[curLine].length
      ].children[0].textContent = value;
      newWords[curLine] = newWords[curLine].concat(value);
    }
    setWord(newWords);
  }

  useEffect(() => {
    if (curLine > 5) alert("run out of today's chance! Try tomorrow");
  }, [curLine]);

  useEffect(() => {
    if (res) {
      for (let i = 0; i < res.length; i++) {
        const element = document.getElementById(curLine).children[i];
        const child = element.children[0].style;
        const container = element.style;

        const animationType = res[i] === 1 ? "gn" : res[i] === -1 ? "gy" : "yw";
        container.animation = `reverse-board-${animationType} 2s forwards`;
        child.animation = "reverse-letter 2s forwards";
      }
    }
  }, [res]);

  useEffect(() => {
    if (keyboard) {
      const prev = "rgb(162, 201, 251)";

      Object.entries(keyboard).forEach(([key, value]) => {
        const element = document.getElementById(key.toUpperCase());
        const bg_color = window.getComputedStyle(element).backgroundColor;
        if (value === 1) element.className = "keyboard-button gn";
        else if (value === 0 && bg_color === prev)
          element.className = "keyboard-button yw";
        else if (value === -1 && bg_color === prev)
          element.className = "keyboard-button gy";
      });
    }
  }, [keyboard]);

  function closeWarning() {
    setSummary(null);
  }

  return (
    <div className="wordle-page" id="wordle">
      <div className="input">
        <SingleLine line={0} />
        <SingleLine line={1} />
        <SingleLine line={2} />
        <SingleLine line={3} />
        <SingleLine line={4} />
        <SingleLine line={5} />
      </div>
      <Keyboard handleLetterClick={handleKeyBoardClick} />
      {summary && (
        <Summary
          closeWarning={closeWarning}
          status={summary.status}
          message={summary.message}
          stage={summary.stage}
        />
      )}
    </div>
  );
}
