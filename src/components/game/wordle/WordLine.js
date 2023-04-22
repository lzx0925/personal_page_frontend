import "./style.css";
import { useState, useEffect } from "react";

export default function WordLine(props) {
  const [id, setId] = useState(1);

  function addLetter() {
    if (id < 5) {
      document.getElementById(id.toString()).querySelector(".letter-text").textContent = props.action;
      setId(id + 1);
    }
  }
 
  function deleteLetter() {
    const prevId = id - 1 >= 1 ? id - 1 : 0;
    document.getElementById(prevId.toString()).querySelector(".letter-text").textContent = "";
    setId(prevId);
  }

  return (
    <div>
      <div className="letter" id="1">
        <div className="letter-text"></div>
      </div>
      <div className="letter" id="2">
        <div className="letter-text"></div>
      </div>
      <div className="letter" id="3">
        <div className="letter-text"></div>
      </div>
      <div className="letter" id="4">
        <div className="letter-text"></div>
      </div>
      <div className="letter" id="5">
        <div className="letter-text"></div>
      </div>
    </div>
  );
}
