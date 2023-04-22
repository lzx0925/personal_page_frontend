import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import Projects from "./Projects";
import NavigationBar from "../navi/NavigationBar.js";

export default function IntroductionContent() {
  const [navi, setNavi] = useState(null);
  useEffect(() => {
    if (navi !== null) {
      const nav = document.getElementById("left-navi").style;
      if (navi) nav.animation = "open-navigation 0.8s ease-in-out forwards";
      else nav.animation = "close-navigation 0.8s ease-in-out forwards";
    }
  }, [navi]);

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

  const [hoveredElement, setHoveredElement] = useState(null);

  function handleMouseMove(event) {
    setHoveredElement(event.target);
  }


  return (
    <div className="introduction-container" onMouseMove={handleMouseMove}>
      <NavigationBar />
      <div className="test">
        {hoveredElement
          ? `Mouse is on ${hoveredElement.className}`
          : "Mouse is not over any element"}
      </div>

      <nav
        className="left-navigation"
        id="left-navi"
        onMouseEnter={() => {
          setNavi(null ? true : !navi);
        }}
        onMouseLeave={() => {
          setNavi(!navi);
        }}
      ></nav>
      <div className="intro-container">
        <Projects/>
        <section id="img2" className="photos">
          <div className="content">
            <p>Photographs</p>
          </div>
          <div className="main-content">
            <div className="albums-collection">
              <div className="albums" id="landscape"></div>
              <p>Landscape</p>
            </div>
            <div className="albums-collection">
              <div className="albums" id="pet"></div>
              <p>Pets</p>
            </div>
            <div className="albums-collection">
              <div className="albums" id="portrait"></div>
              <p>Portrait</p>
            </div>
          </div>
        </section>
        <section id="img3" className="crochets">
          <div className="content">
            <p>Crochet</p>
          </div>
        </section>
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
        <section id="img5" className="social-media">
          <div className="content">
            <p>Social Media</p>
          </div>
        </section>
      </div>
    </div>
  );
}
