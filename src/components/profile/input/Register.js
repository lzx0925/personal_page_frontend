import React from "react";
import { useState, useEffect } from "react";
import Warning from "./Warning";
import axios from "axios";
import Email from "./Email";
import Password from "./Password";
import Username from "./Username";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
const emailValidator = require("email-validator");
const {backend_url} = require("../../../config")

export default function Register(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [warning, setWarning] = useState("");

  const handleSubmit = () => {
    if (
      !checkFormat(
        registerData.email,
        registerData.password,
        registerData.username
      )
    ) {
      setWarning("Invalid data exists.");
    } else {
      axios
        .post(backend_url+"/register", { registerData: registerData })
        .then((response) => {
          console.log(response.data);
          if (response.data.error) {
            setWarning(response.data.error);
          }
          if (response.data.user) {
            dispatch({ type: "LOGIN", payload: response.data.user });
            Cookies.set("user", JSON.stringify(response.data.user));
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error);
          return error;
        });
    }
  };
  useEffect(() => {
    Object.entries(registerData).map(([key, value]) => {
      console.log(key, ":", value);
    });
  }, [registerData]);

  function inputAttribute(name, value) {
    setRegisterData({ ...registerData, [name]: value });
  }


  const checkFormat = (email, password, username) => {
    if (registerData.username.length < 3) return false;
    if (!emailValidator.validate(email)) return false;
    if (/^.{8,16}$/.test(password) === false) return false;
    return true;
  };

  function checkButton() {
    if (props.button)
      return (
        <button className="fa fa-close" onClick={props.closeRegister}></button>
      );
  }
  return (
    <div className="register-func">
      <div className="register-form">
        {checkButton()}
        <h1>Register</h1>
        <form>
          <Email inputAttribute={inputAttribute} />
          <Password inputAttribute={inputAttribute} />
          <Username inputAttribute={inputAttribute} />
        </form>
        {warning && <Warning context={warning} />}
        <button
          className="confirm-register"
          onClick={handleSubmit}
          onBlur={() => setWarning("")}
        >
          Register
        </button>
        <button className="open-login" onClick={props.openLogin}>
          Already have account?
        </button>
      </div>
    </div>
  );
}

/*
  const checkFormat = (email, password) => {
    if (registerData[title] === "") {
      setWarning({ ...warningData, [title]: title + " is required." });
    } else {
      if (title === "username") {
        registerData.username.length >= 6
          ? setWarning({ ...warningData, username: null })
          : setWarning({
              ...warningData,
              username: "Username must be at least 6",
            });
      }
      if (title === "email") {
        emailValidator.validate(registerData.email)
          ? setWarning({
              ...warningData,
              email: null,
            })
          : setWarning({
              ...warningData,
              email: "Invalid Email Address",
            });
      }
      if (title === "password") {
        /^.{8,16}$/.test(registerData.password)
          ? setWarning({ ...warningData, password: null })
          : setWarning({
              ...warningData,
              password: "Password should in 8-16 characters",
            });
      }
    }
  };*/

/*
        <div className="form-group">
          <label>Username</label>
          {warningData.username && <Warning context={warningData.username} />}
          <input
            className="user-name"
            placeholder="Unique Username!"
            name="username"
            value={registerData.username}
            onChange={(event) => handleChange(event)}
            onBlur={() => checkFormat("username")}
          ></input>
        </div>
        <div className="form-group">
          <label>Email</label>
          {warningData.email && <Warning context={warningData.email} />}
          <input
            className="e-mail"
            name="email"
            value={registerData.email}
            onChange={(event) => handleChange(event)}
            onBlur={() => checkFormat("email")}
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          {warningData.password && <Warning context={warningData.password} />}
          <input
            type="password"
            className="password"
            name="password"
            value={registerData.password}
            onChange={(event) => handleChange(event)}
            onBlur={() => checkFormat("password")}
          ></input>
        </div>
*/
