import "./style.css";
import { useEffect } from "react";

export default function SingleLine({ row, word, res }) {
  const getAnimation = (res, i) => {
    if (!res) return {};
    return {
      animation: `reverse-board-${
        res[i] === 1 ? "gn" : res[i] === -1 ? "gy" : "yw"
      } 1s forwards`,
    };
  };

  return (
    <div className="words" id={row}>
      {Array.from({ length: 5 }, (_, i) => (
        <div className="word" key={i} style={getAnimation(res, i)}>
          <div
            className="letter-text"
            style={res ? { animation: "reverse-letter 1s forwards" } : {}}
          >
            {word[i] || ""}
          </div>
        </div>
      ))}
    </div>
  );
}
