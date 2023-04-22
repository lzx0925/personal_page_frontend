import React from "react";
import "./style.css";
//import { useState, useEffect } from "react";

export default function Symbol() {
  const drag = (e) => {
    e.dataTransfer.setData("symbol", e.target.getAttribute("name"));
  };

  function getSymbols() {
    const symbols = ["+", "-", "*", "/", "()"];
    const components = [];
    symbols.forEach((symbol) => {
      components.push(
        <div
          className="symbol"
          value={symbol}
          key={symbol}
          name={symbol}
          draggable="true"
          onDragStart={(e) => drag(e)}
        >
          {symbol === "/" ? "÷" : symbol === "*" ? "×" : symbol}
        </div>
      );
    });
    return components;
  }
  return <div className="symbol-container">{getSymbols()}</div>;
}
