import React from "react";
import "./style.css";
import { useState, useEffect, useRef } from "react";

export default function Painting() {
  const [page, setPage] = useState(1);
  const pageHandler = (e) => {
    console.log(e.target.id.slice(-1), page);
    const clickPage = Number(e.target.id.slice(-1));
    const currentPage = document.getElementById(e.target.id).parentNode.style;
    if (page <= clickPage) {
      console.log("next");
      currentPage.transform = "rotateY(-180deg)";
      currentPage.transition = "1.4s";
      setPage(page + 1);
    } else {
      console.log("last");
      console.log(clickPage, (19 - (clickPage - 2) * 2).toString());
      clickPage === 1
        ? (currentPage.transform = "rotateY(-25deg)")
        : (currentPage.transform =
            "rotateY(-" + (19 - (clickPage - 2) * 2).toString() + "deg)");
      currentPage.transition = "1.4s";
      setPage(page - 1);
    }
  };
  return (
    <section id="img4" className="painting">
      <div className="content">
        <p>Painting</p>
      </div>
      <div className="main-content">
        <ul className="painting-book" id="painting-book">
          <li>
            <img
              src="painting1.jpg"
              id="painting1"
              onClick={(e) => pageHandler(e)}
            ></img>
          </li>
          <li>
            <img
              src="painting2.jpg"
              id="painting2"
              onClick={(e) => pageHandler(e)}
            ></img>
          </li>
          <li>
            <img
              src="painting3.jpg"
              id="painting3"
              onClick={(e) => pageHandler(e)}
            ></img>
          </li>
          <li>
            <img
              src="painting4.jpg"
              id="painting4"
              onClick={(e) => pageHandler(e)}
            ></img>
          </li>
          <li>
            <img src="painting5.jpg" id="painting5"></img>
          </li>
        </ul>
      </div>
    </section>
  );
}
