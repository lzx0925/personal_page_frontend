import "./style.css";
import { useState, useEffect } from "react";
import Keyboard from "./Keyboard.js";

import Summary from "./Summary";
import SingleLine from "./SingleLine.js";
import { check_wordle } from "../../../services/wordle.js";

export default function Wordle() {
  const [curRow, setCurRow] = useState(0);
  const [words, setWord] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState();
  const [res, setRes] = useState(["", "", "", "", "", ""]);
  const [keyboard, setKeyboard] = useState();
  const [complete, setComplete] = useState(false);
  const reverseDuration = 1;

  // const [curRow, setCurRow] = useState(() => {
  //   return localStorage.getItem("curRow")
  //     ? JSON.parse(localStorage.getItem("curRow"))
  //     : 0;
  // });

  // const [words, setWord] = useState(() => {
  //   return localStorage.getItem("words")
  //     ? JSON.parse(localStorage.getItem("words"))
  //     : ["", "", "", "", "", ""];
  // });

  // const [message, setMessage] = useState("");

  // const [res, setRes] = useState(() => {
  //   return localStorage.getItem("res")
  //     ? JSON.parse(localStorage.getItem("res"))
  //     : ["", "", "", "", "", ""];
  // });

  // const [keyboard, setKeyboard] = useState(() => {
  //   return localStorage.getItem("keyboard")
  //     ? JSON.parse(localStorage.getItem("keyboard"))
  //     : {};
  // });

  // // Save to localStorage on component unload or page hide
  // useEffect(() => {
  //   const handleSaveToLocalStorage = () => {
  //     localStorage.setItem("curRow", JSON.stringify(curRow));
  //     localStorage.setItem("words", JSON.stringify(words));
  //     localStorage.setItem("res", JSON.stringify(res));
  //     localStorage.setItem("keyboard", JSON.stringify(keyboard));
  //   };

  //   // Save on page unload
  //   window.addEventListener("beforeunload", handleSaveToLocalStorage);

  //   // Save when page is hidden (user switches tab)
  //   document.addEventListener("visibilitychange", () => {
  //     if (document.visibilityState === "hidden") {
  //       handleSaveToLocalStorage();
  //     }
  //   });

  //   // Clean up event listeners on component unmount
  //   return () => {
  //     window.removeEventListener("beforeunload", handleSaveToLocalStorage);
  //     document.removeEventListener(
  //       "visibilitychange",
  //       handleSaveToLocalStorage
  //     );
  //   };
  // }, [curRow, words, res, keyboard]);

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
      }, (reverseDuration)*1000);

      setComplete(true);
    } else if (curRow >= 5) {
      setTimeout(() => {
        setMessage({
          correct: false,
          times: curRow + 1,
        });
      }, (reverseDuration)*1000);

      setComplete(true);
    }
  }, [res]);

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
      {message && (
        <Summary
          correct={message.correct}
          times={message.times}
          clearMessage={() => setMessage()}
        />
      )}
    </div>
  );
}
