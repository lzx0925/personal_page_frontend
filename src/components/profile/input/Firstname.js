import React from "react";
import "../style.css";
import { useState } from "react";
import Warning from "./Warning";

export default function Firstname(props) {
  const [firstname, setUsername] = useState(props.value ? props.value : "");
  const [warning, setWarning] = useState(null);

  const handleChange = (event) => {
    setUsername(event.target.value);
    props.inputAttribute(event.target.name, event.target.value);
  };
  function checkFormat() {
    if (firstname === "" || /^[a-zA-Z]+$/.test(firstname)) {
      setWarning(null);
    } else {
      setWarning("Firstname must be letters.");
    }
  }

  return (
    <div>
      <div className="form-group">
        <label>Firstname</label>
        {warning && <Warning context={warning} />}
        <input
          className="firstname"
          name="firstname"
          value={firstname}
          onChange={(event) => handleChange(event)}
          onBlur={() => checkFormat()}
        ></input>
      </div>
    </div>
  );
}
