import "./style.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CloseButton from "../../icon/CloseButton";

// import axios from "axios";
// const {backend_url} = require("../../../config")

export default function Summary({ correct, times, clearMessage }) {
  // const { user } = useSelector((state) => ({ ...state }));
  // const { stage, setStage } = useState();
  // console.log(user);
  // useEffect(() => {
  //   if (user) {

  //   }
  // }, []);
  const localStats = JSON.parse(localStorage.getItem("gameStats")) || {
    totalGames: 0,
    totalWins: 0,
    perTimesStats: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    }, //[win,lose]
    curStreak: 0,
    maxStreak: 0,
  };

  const [gameStats, setGameStats] = useState(localStats);

  useEffect(() => {
    if (correct === undefined || times === undefined) return;

    let updatedStats = { ...localStats };

    //加入此次数据
    updatedStats.totalGames += 1;

    if (correct) {
      updatedStats.totalWins += 1;
      updatedStats.perTimesStats[times] += 1;
      updatedStats.maxStreak += 1;
      updatedStats.curStreak += 1;
    } else {
      updatedStats.curStreak = 0;
      updatedStats.maxStreak = Math.max(
        updatedStats.maxStreak,
        updatedStats.curStreak
      );
    }

    // 更新状态和 localStorage
    setGameStats(updatedStats);
    localStorage.setItem("gameStats", JSON.stringify(updatedStats));
  }, []);

  const getAnimation = (win, total) => {
    const percent = Math.floor((100 * win) / total);

    return {
      "--progress-percent": percent.toString() + "%",
      animation: "progress-change 2s ease-in-out forwards",
    };
  };

  const handleClose = () => {
    clearMessage();
  };
  return (
    gameStats && (
      <div className="summary-container">
        <div className="real-space">
          <div className="title">{correct ? "Congrats" : "Sorry"}</div>
          <div className="stats-summary">
            <div className="title"> STATISTICS</div>
            <div className="stats-content">
              <div>
                <div className="stats">{gameStats.totalGames}</div>
                <div className="subtitle">Played</div>
              </div>
              <div>
                <div className="stats">
                  {Math.round(
                    (gameStats.totalWins / gameStats.totalGames) * 100
                  )}
                  %
                </div>
                <div className="subtitle">Win %</div>
              </div>
              <div>
                <div className="stats">{gameStats.maxStreak}</div>
                <div className="subtitle">Current Streak</div>
              </div>
              <div>
                <div className="stats">{gameStats.maxStreak}</div>
                <div className="subtitle">Max Streak</div>
              </div>
            </div>
          </div>
          <div className="histogram">
            <div className="title"> GUESS DISTRIBUTION</div>
            {Array.from({ length: 6 }, (_, i) => {
              return (
                <div className="histogram-row" key={i}>
                  <div className="title">{`${i + 1}`}</div>
                  <div className="bar" key={`${i + 1}`}>
                    <div
                      className={
                        "percent" +
                        (correct && i + 1 === times ? " current" : "")
                      }
                      style={getAnimation(
                        gameStats.perTimesStats[i + 1],
                        gameStats.totalGames
                      )}
                    >
                      <div className="win-times">
                        {gameStats.perTimesStats[i + 1] !== 0
                          ? gameStats.perTimesStats[i + 1]
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div id="close-wordle-summary">
            <CloseButton color="var(--wordle-grey)" handleClose={handleClose} />
          </div>
        </div>
      </div>
    )
  );
}
