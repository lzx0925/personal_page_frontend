import React from "react";
import "../style.css";
import { useState } from "react";
import Warning from "./Warning";

export default function Lastname(props) {
  const origin = props.value ? props.value : null;
  const [lastname, setUsername] = useState(props.value ? props.value : "");
  const [warning, setWarning] = useState(null);

  const handleChange = (event) => {
    setUsername(event.target.value);
    props.inputAttribute(event.target.name, event.target.value);
  };
  function checkFormat() {
    if (lastname === "" || /^[a-zA-Z]+$/.test(lastname)) setWarning(null);
    else setWarning("Lastname must be letters.");
  }

  return (
    <div>
      <div className="form-group">
        <label>Lastname</label>
        {warning && <Warning context={warning} />}
        <input
          className="lastname"
          name="lastname"
          value={lastname}
          onChange={(event) => handleChange(event)}
          onBlur={() => checkFormat()}
        ></input>
      </div>
    </div>
  );
}
