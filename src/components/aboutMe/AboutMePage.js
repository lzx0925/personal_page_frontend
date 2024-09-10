import React from "react";
import "./style.css";
import { useState, useEffect, useRef } from "react";
import Projects from "./Projects";
import Photos from "./Photos";
import Painting from "./Painting";
import Crochet from "./Crochet";

export default function AboutMePage() {
  const [navi, setNavi] = useState(null);
  const imgRef = useRef(null);

  const [hoveredElement, setHoveredElement] = useState(null);

  function handleMouseMove(event) {
    setHoveredElement(event.target);
  }

  return (
    <div
      className="introduction-container"
      id="introduction"
      onMouseMove={handleMouseMove}
      ref={imgRef}
    >
      <div className="test">
        {hoveredElement
          ? `Mouse is on ${hoveredElement.className}`
          : "Mouse is not over any element"}
      </div>

      <nav className="left-navigation" id="left-navi"></nav>
      {/* <div className="intro-container"> */}
      <Projects />
      <Photos />
      <Crochet />
      <Painting />
    </div>
  );
}
