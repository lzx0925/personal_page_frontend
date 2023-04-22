import React from "react";
import "../style.css";
import { useState } from "react";
import Warning from "./Warning";

export default function Gender(props) {
  const origin = props.value ? props.value : null;
  const [gender, setGender] = useState(props.value ? props.value : null);
  const [warning, setWarning] = useState(null);

  const handleChange = (event) => {
    setGender(event.target.value);
    props.inputAttribute(event.target.name, event.target.value);
  };

  return (
    <div>
      <div className="form-group">
        <div>Gender</div>
        <select
          name="gender"
          className="gender"
          value={gender}
          onChange={(event) => handleChange(event)}
        >
          <option value=""></option>
          <option value="m">Male</option>
          <option value="f">Female</option>
          <option value="n">Non-binary</option>
        </select>
      </div>
    </div>
  );
}
