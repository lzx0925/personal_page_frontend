import "./style.css";
import { useState, useEffect } from "react";
import Keyboard from "./Keyboard.js";
import NavigatorBar from "../../navi/NavigationBar.js";
import Summary from "./Summary";
import SingleLine from "./SingleLine.js";
import axios from "axios";

export default function Wordle() {
  const [line, setLine] = useState(0);
  const [words, setWord] = useState(["", "", "", "", ""]);
  const [green, setGreen] = useState(new Set());
  const [yellow, setYellow] = useState(new Set());
  const [summary, setSummary] = useState(null);

  function handleLetterClick(name, value) {
    const newWords = [...words];
    if (line > 4) {
      alert("run out of today's chance! Try tomorrow ~");
      return;
    }
    if (name === "Enter") {
      if (words[line].length === 5) {
        axios
          .post("http://localhost:5000/wordle", { word: words[line] })
          .then((response) => {
            if (response.data.result) {
              showResult(response.data.result);
              keyboardColorHandler(JSON.parse(response.data.keyboard));
              if (
                JSON.stringify(response.data.result) ===
                JSON.stringify([1, 1, 1, 1, 1])
              ) {
                setSummary({
                  status: "Win",
                  message:
                    "Congrats! You find correct words at Stage " +
                    (line + 1).toString() +
                    " !",
                  stage: line + 1,
                });
              } else if (line === 4) {
                setSummary({
                  status: "Lose",
                  message: "Sorry, Run out of chances!",
                  stage: line + 1,
                });
              }
              setLine(line + 1);
            } else alert("No word " + words[line] + " in dictionary!");
          })
          .catch((error) => {
            console.error(error);
            return error;
          });
      }
    } else if (name === "Backspace") {
      if (words[line].length > 0) {
        document.getElementById(line).children[
          words[line].length - 1
        ].children[0].textContent = "";
        newWords[line] = newWords[line].slice(0, -1);
      }
    } else {
      if (words[line].length < 5) {
        document.getElementById(line).children[
          words[line].length
        ].children[0].textContent = value;
        newWords[line] = newWords[line].concat(value);
      }
    }
    setWord(newWords);
  }

  function showResult(result) {
    for (let i = 0; i < result.length; i++) {
      const element = document.getElementById(line).children[i].style;
      const child = document.getElementById(line).children[i].children[0].style;
      if (result[i] === 1) {
        element.animationName = "reverse-board-1";
      } else if (result[i] === -1) {
        element.animationName = "reverse-board-2";
      } else {
        element.animationName = "reverse-board-3";
      }
      element.animationDuration = "2s";
      element.animationFillMode = "forwards";
      child.animationName = "reverse-letter";
      child.animationDuration = "2s";
      child.animationFillMode = "forwards";
    }
  }

  function keyboardColorHandler(result) {
    for (const key in result) {
      const element = document.getElementById(key).style;
      if (result[key] === 1) {
        element.backgroundColor = "#cbeb7c";
        element.borderColor = "#b7eb39";
        const newSet = green;
        newSet.add(key);
        setGreen(newSet);
      } else if (result[key] === 0 && green.has(key) === false) {
        element.backgroundColor = "#ffdb6a";
        element.borderColor = "#ffd348";
        const newSet = yellow;
        newSet.add(key);
        setYellow(newSet);
      } else if (
        result[key] === -1 &&
        green.has(key) === false &&
        yellow.has(key) === false
      ) {
        element.backgroundColor = "#d3d4d2";
        element.borderColor = "#c9c9c9";
      }
    }
  }

  function closeWarning() {
    setSummary(null);
  }

  return (
    <div className="container">
      <NavigatorBar />
      <div className="title">Wordle</div>
      <div className="input-box">
        <SingleLine line={0} />
        <SingleLine line={1} />
        <SingleLine line={2} />
        <SingleLine line={3} />
        <SingleLine line={4} />
      </div>
      <Keyboard changeTextLetter={handleLetterClick} />
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
