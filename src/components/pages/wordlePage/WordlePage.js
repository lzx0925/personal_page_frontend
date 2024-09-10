
import { useState, useEffect } from "react";
import Keyboard from "../../game/wordle/Keyboard.js";

import Summary from "../../game/wordle/Summary.js";
import SingleLine from "../../game/wordle/SingleLine.js";
import { check_wordle } from "../../../services/wordle.js";

export default function WordlePage() {
  const [curRow, setCurRow] = useState(0);
  const [words, setWord] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState();
  const [res, setRes] = useState(["", "", "", "", "", ""]);
  const [keyboard, setKeyboard] = useState();
  const [complete, setComplete] = useState(false);
  const [openSummary, setOpenSummary] = useState();
  const reverseDuration = 1;

  async function handleKeyBoardClick(value) {
    if (complete) return;
    const len = words[curRow].length;

    if (value === "ENTER" && len === 5) {
      const res = await check_wordle(words[curRow]);
      const data = res.data;

      setRes((prevRes) =>
        prevRes.map((res, i) => (i === curRow ? data.result : res))
      );
      setKeyboard(data.keyboard);
      setTimeout(() => (curRow < 5 ? setCurRow(curRow + 1) : null), 1000);
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

  // useEffect(() => {
  //   console.log("所有单词", words);
  //   console.log("完成了一行，上一行是：", words[curRow - 1]);

  // }, [curRow]);

  useEffect(() => {
    const noValue = Object.values(res[curRow]).every(
      (element) => element === undefined
    );
    if (noValue) return;

    const correct = Object.values(res[curRow]).every(
      (element) => element === 1
    );

    if (correct) {
      setTimeout(() => {
        setMessage({
          correct: true,
          times: curRow + 1,
        });
        setOpenSummary(true);
      }, reverseDuration * 1000);

      setComplete(true);
    } else if (curRow >= 5) {
      setTimeout(() => {
        setMessage({
          correct: false,
          times: curRow + 1,
        });
        setOpenSummary(true);
      }, reverseDuration * 1000);

      setComplete(true);
    }
  }, [res]);

  useEffect(
    () => console.log("summary open?", openSummary, "message?", message),
    [openSummary]
  );

  const handleOpenSummary = () => {
    setOpenSummary(!openSummary);
    setMessage();
  };

  return (
    <div className="wordle-page" id="wordle">
      <div className="input">
        {Array.from({ length: 6 }, (_, row) => (
          <SingleLine
            key={row}
            row={row}
            word={words[row]}
            res={res[row]}
            reverseDuration={reverseDuration}
          />
        ))}
      </div>

      <Keyboard handleLetterClick={handleKeyBoardClick} update={keyboard} />
      {openSummary && (
        <Summary
          correct={message && message.correct}
          times={message && message.times}
          handleOpen={handleOpenSummary}
        />
      )}

      {!openSummary && (
        <button
          className="fa fa-chart-bar"
          onClick={() => setOpenSummary(true)}
        />
      )}
    </div>
  );
}
