import React from "react";
import "../style.css";
import { useState } from "react";

export default function Headshot(props) {
  const handleChange = (event) => {
    props.inputAttribute(event.target.name, event.target.value);
  };
  function getAllHeadshots() {
    const headshotButtons = [];
    for (let i = 1; i < 14; i++) {
      headshotButtons.push(
        <button
          className="headshot"
          key={"headshot" + i.toString()}
          name="headshot"
          style={{
            background: `url('./headshot${i}.JPG')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
          }}
          value={"./headshot" + i.toString() + ".JPG"}
          onClick={(event) => handleChange(event)}
        ></button>
      );
    }
    return headshotButtons;
  }

  return (
    <div>
      <div className="headshot-box">{getAllHeadshots()}</div>
    </div>
  );  
}
