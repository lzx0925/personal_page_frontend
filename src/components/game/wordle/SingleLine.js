import "./style.css";
import { useEffect, useState } from "react";

export default function SingleLine({ row, word, res, reverseDuration }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (res) {
      setAnimate(true);
    }
  }, [res]);

  const getAnimation = (res, i) => {
    if (!res || !animate) return {};
    return {
      animation: `reverse-board-${
        res[i] === 1 ? "gn" : res[i] === -1 ? "gy" : "yw"
      } ${reverseDuration}s forwards ${i * 0.1}s`,
    };
  };

  return (
    <div className="words" id={row}>
      {Array.from({ length: 5 }, (_, i) => (
        <div className="word" key={i} style={getAnimation(res, i)}>
          <div
            className="letter-text"
            style={
              animate
                ? { animation: `reverse-letter 1s forwards ${i * 0.1}s` }
                : {}
            }
          >
            {word[i] || ""}
          </div>
        </div>
      ))}
    </div>
  );
}
