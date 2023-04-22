import React from "react";
import "../style.css";
import { useState } from "react";
import Warning from "./Warning";
const emailValidator = require("email-validator");

export default function Email(props) {
  const [email, setEmail] = useState(props.value ? props.value : "");
  const [warning, setWarning] = useState(null);

  const handleChange = (event) => {
    setEmail(event.target.value);
    props.inputAttribute(event.target.name,event.target.value);
  };

  function checkFormat() {
    if (email === "") {
      setWarning("Email is required.");

    } else {
      if (emailValidator.validate(email)) {
        setWarning(null);

      } else {
        setWarning("Invalid Email Address");

      }
    }
  }

  return (
    <div>
      <div className="form-group">
        <label>Email</label>
        {warning && <Warning context={warning} />}
        <input
          className="e-mail"
          name="email"
          value={email}
          onChange={(event) => handleChange(event)}
          onBlur={() => checkFormat()}
        ></input>
      </div>
    </div>
  );
}
