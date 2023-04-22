import React from "react";
import "./style.css";
import { useState } from "react";
// onClick={() => (window.location.href = "/wordle")}
export default function GameBar() {
  return (
    <div className="extend-bar game">
      <div className="extendbar-lists game-lists">
        <div className="list">
          <div className="list-name">Wordle</div>
          <img className="list-img" src="/wordle.png" alt="" onClick={() => (window.location.href = "/wordle")}/>
        </div>
        <div className="list">
          <div className="list-name">More...</div>
          <img className="list-img" src="/explore.png" alt="" />
        </div>
      </div>
    </div>
  );
}
