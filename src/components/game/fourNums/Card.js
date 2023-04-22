import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
const {backend_url} = require("../../../config")
export default function Symbol(props) {
  const [getCard, setGetCard] = useState(false);
  const [value, setValue] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [type, setType] = useState({ 1: "", 2: "", 3: "", 4: "" });
  async function handleGetCard() {
    axios
      .post(backend_url+"/fourNums", {})
      .then((res) => {
        setGetCard(true);
        res.data.nums.forEach((num, index) => {
          const i = (index + 1).toString();
          const card = document.getElementById("card" + i);
          setValue((prevState) => ({ ...prevState, [index + 1]: num }));
          const child2 = document.createElement("div");
          child2.setAttribute("class", "r2");
          child2.setAttribute("id", i + "r2");
          child2.setAttribute("key", i + "r2");
          child2.innerHTML = "&#9830;";
          card.appendChild(child2);
          card.style.animationName = "assign-card" + (index + 1).toString();
          card.style.animationDuration = "1s";
          card.style.animationFillMode = "forwards";
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const drag = (e) => {
    e.dataTransfer.setData("card", e.target.id);
  
  };

  return (
    <div className="poker">
      <div className="poker-container">
        {!getCard && <div className="poker-back">&#9819;</div>}
        <div
          className="poker1"
          id="card1"
          value={value[1]}
          draggable="true"
          onDragStart={(e) => drag(e)}
        >
          {value[1]}
        </div>
        <div
          className="poker2"
          id="card2"
          value={value[2]}
          draggable="true"
          onDragStart={(e) => drag(e)}
        >
          {value[2]}
        </div>
        <div
          className="poker3"
          id="card3"
          value={value[3]}
          draggable="true"
          onDragStart={(e) => drag(e)}
        >
          {value[3]}
        </div>
        <div
          className="poker4"
          id="card4"
          value={value[4]}
          draggable="true"
          onDragStart={(e) => drag(e)}
        >
          {value[4]}
        </div>
      </div>
      {!getCard && (
        <button className="get-card-button" onClick={handleGetCard}>
          Get your cards
        </button>
      )}
    </div>
  );
}
