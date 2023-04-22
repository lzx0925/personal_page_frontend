import React from "react";
import "../style.css";
import { useState } from "react";
import Warning from "./Warning";
import NewPassword from "./NewPassword";
import axios from "axios";
export default function Password(props) {
  const [goNew, setGoNew] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] =useState();
  const [warning, setWarning] = useState(null);

  const handleChange = (event) => {
    if (props.modify) {
      setPassword(event.target.value);
    } else {
      setPassword(event.target.value);
      props.inputAttribute(event.target.name, event.target.value);
    }
  };

  function checkFormat() {
    if (password === "") {
      setWarning("Password is required.");
    } else {
      if (/^.{8,16}$/.test(password)) {
        if (props.modify) {
          if (checkOldPassword(password)) {
            setGoNew(true);
            setWarning(null);
          } else setWarning("Old password is incorrect.");
        } else setWarning(null);
      } else {
        setWarning("Password should in 8-16 characters");
      }
    }
  }
  function checkOldPassword(password) {
    axios
      .post("http://localhost:3001/check-password", { password: password })
      .then((response) => {
        return response.result == true ? true : false;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
  return (
    <div>
      <div className="form-group">
        <label> {props.modify ? "Old" : ""} Password</label>
        {warning && <Warning context={warning} />}
        <input
          className="password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => handleChange(event)}
          onBlur={() => checkFormat()}
        ></input>
      </div>
      {goNew && <NewPassword />}
    </div>
  );
}
