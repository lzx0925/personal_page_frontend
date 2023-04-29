import React from "react";
import "./style.css";
import { useState, useEffect } from "react";

export default function GameBar() {
  const [gameList, setGameList] = useState([
    { name: "Wordle", img: "/wordle.png" },
    { name: "24 Points", img: "/24points.png" },
  ]);

  function generateGameList() {
    return gameList.map((game, index) => (
      <div key={index} className="list">
        <div
          className="game-img"
          onClick={() => (window.location.href = "/wordle")}
          style={{ backgroundImage: "url(".concat(game.img).concat(")") }}
        ></div>
        <div className="list-name">{game.name}</div>
      </div>
    ));
  }

  return (
    <div className="extend-game" id="game">
      {generateGameList()}
    </div>
  );
}
