import "./style.css";
import { useState, useEffect } from "react";
import Keyboard from "./Keyboard.js";

import Summary from "./Summary";
import SingleLine from "./SingleLine.js";
import { check_wordle } from "../../../services/wordle.js";

export default function Wordle() {
  const [curRow, setCurRow] = useState(0);
  const [words, setWord] = useState(["", "", "", "", "", ""]);
  const [summary, setSummary] = useState(null);
  const [res, setRes] = useState(["", "", "", "", "", ""]);
  const [keyboard, setKeyboard] = useState();
  const [debugMessage, setDebugMessage] = useState("");

  async function handleKeyBoardClick(value) {
    const len = words[curRow].length;

    if (value === "ENTER" && len === 5) {
      setDebugMessage("点成功了，发到后端拿data..."); // Debug message 1
      try {
        const res = await check_wordle(words[curRow]);
        const data = res.data;

        setDebugMessage("拿到data了,更改status..."); // Debug message 2

        // Update result for the current row
        setRes((prevRes) =>
          prevRes.map((res, i) => (i === curRow ? data.result : res))
        );
        setKeyboard(data.keyboard);

        setDebugMessage("更改成功，按理说该触发动画了.."); // Debug message 3

        setTimeout(() => {
          if (curRow < 5) {
            setCurRow(curRow + 1);
            setDebugMessage(`结束...有动画了吗？？`); // Debug message 4
          }
        }, 1000);
      } catch (error) {
        const errorMessage = error?.err || "An unknown error occurred";
        setDebugMessage(`出问题啦~ ${errorMessage}`); // Debug message 5
      }
      // const res = await check_wordle(words[curRow]);
      // const data = res.data;

      // setRes((prevRes) =>
      //   prevRes.map((res, i) => (i === curRow ? data.result : res))
      // );
      // setKeyboard(data.keyboard);
      // setTimeout(() => (curRow < 5 ? setCurRow(curRow + 1) : null), 1000);
    } else if (value === "BACKSPACE" && len > 0) {
      setWord((prevWords) =>
        prevWords.map((word, i) => (i === curRow ? word.slice(0, -1) : word))
      );
    } else if (value.length === 1 && len < 5) {
      setWord((prevWords) =>
        prevWords.map((word, i) => (i === curRow ? word + value : word))
      );
    }
  }

  useEffect(() => {
    console.log("所有单词", words);
    console.log("完成了一行，上一行是：", words[curRow - 1]);
    if (curRow > 5) alert("run out of today's chance! Try tomorrow");
  }, [curRow]);

  function closeWarning() {
    setSummary(null);
  }

  return (
    <div className="wordle-page" id="wordle">
      <div className="input">
        {Array.from({ length: 6 }, (_, row) => (
          <SingleLine key={row} row={row} word={words[row]} res={res[row]} />
        ))}
      </div>
      <div
        className="debug-message"
        style={{ marginTop: "20px", color: "red" }}
      >
        {debugMessage}
      </div>
      <Keyboard handleLetterClick={handleKeyBoardClick} update={keyboard} />
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
