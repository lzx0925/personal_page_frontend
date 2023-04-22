import React from "react";
import "../style.css";
import { useState } from "react";
import Warning from "./Warning";

export default function Birthday(props) {
  // const [firstname, setUsername] = useState(props.value ? props.value : "");
  // const [warning, setWarning] = useState(null);

  // const handleChange = (event) => {
  //   setUsername(event.target.value);
  //   props.setUsername(event.target.value);
  // };
  // function checkFormat() {
  //   if (username === "") {
  //     setWarning("Firstname is required.");
  //     props.checkWarn("username", true);
  //   } else {
  //     if (/^[a-zA-Z]+$/.test(str)) {
  //       setWarning(null);
  //     } else {
  //       setWarning("Firstname must be letters.");
  //     }
  //   }
  // }

  return (
    <div>
      <div className="form-group">birthday</div>
    </div>
  );
}
