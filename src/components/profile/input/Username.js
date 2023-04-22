import React from "react";
import "../style.css";
import { useState } from "react";
import Warning from "./Warning";
import axios from "axios";

export default function Username(props) {
  const [username, setUsername] = useState(props.value ? props.value : "");
  const [warning, setWarning] = useState(null);
  const handleChange = (event) => {
    setUsername(event.target.value);
    props.inputAttribute(event.target.name, event.target.value);
  };
  function checkFormat() {
    if (username === "") {
      setWarning("Username is required.");
    } else {
      if (username.length >= 1) {
        setWarning(null);
      } else {
        setWarning("Username must be at least 1 characters.");
      }
    }
  }

  return (
    <div>
      <div className="form-group">
        <label>Username</label>
        {warning && <Warning context={warning} />}
        <input
          className="user-name"
          name="username"
          value={username}
          onChange={(event) => handleChange(event)}
          onBlur={() => checkFormat()}
        ></input>
      </div>
    </div>
  );
}
