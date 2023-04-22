import React from "react";
import "../style.css";
import { useState } from "react";
import Warning from "./Warning";
import axios from "axios";
export default function Password(props) {
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);

  // const handleChange = (event) => {
  //   if (event.target.name === "new-password") {
  //     setNewPassword(event.target.value);
  //     props.inputAttribute("password", event.target.value);
  //   } else {
  //     setPassword(event.target.value);
  //     if (!props.modify) props.inputAttribute("password", event.target.value);
  //   }
  // };

  // function checkFormat() {
  //   if (password === "") {
  //     setWarning("Password is required.");
  //   } else {
  //     if (/^.{8,16}$/.test(password)) {
  //       const match = checkOldPassword(password);
  //       if (match) {
  //         setgoNew(true);
  //         setWarning(null);
  //       } else if (!match) {
  //         setWarning("Password does not match original one.");
  //       } else setWarning(null);
  //     } else {
  //       setWarning("Password should in 8-16 characters");
  //     }
  //   }
  // }

 
  return (
    <div>
      {/* <div className="form-group">
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
      {goNew && (
        <div className="form-group">
          <label>New Password</label>
          {warning && <Warning context={warning} />}
          <input
            className="password"
            type="password"
            name="new-password"
            value={newPassword}
            onChange={(event) => handleChange(event)}
            onBlur={() => checkFormat()}
          ></input>
        </div>
      )} */}
    </div>
  );
}
