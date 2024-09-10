import React from "react";
import "./style.css";
import { useState, useEffect } from "react";

export default function GameBar() {
  const [gameList, setGameList] = useState([
    { name: "Wordle", img: "/wordle.png", url: "/wordle" },
    { name: "24 Points", img: "/24points.png", url: "/FourNums" },
  ]);

  function generateGameList() {
    return gameList.map((game, index) => (
      <div key={index} id="game-li">
  
          <div
            className="game-img"
            onClick={() => (window.location.href = game.url)}
            style={{ backgroundImage: "url(".concat(game.img).concat(")") }}
          ></div>
          <div className="list-name">{game.name}</div>
  
      </div>
    ));
  }

  return (
    <div className="extend-content" id="game-extend-bar">
      {generateGameList()}
    </div>
  );
}
