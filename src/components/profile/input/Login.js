import React from "react";
import { useState, useEffect } from "react";
import Warning from "./Warning";
import axios from "axios";
import Email from "./Email";
import Password from "./Password";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
const { backend_url } = require("../../../config");

const emailValidator = require("email-validator");

export default function Login(props) {
  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [warning, setWarning] = useState("");
  const handleSubmit = () => {
    if (!checkFormat(loginData.email, loginData.password)) {
      setWarning("Invalid data exists.");
    } else {
      axios
        .post(backend_url + "/login", { loginData: loginData })
        .then((response) => {
          if (!response.data.user) {
            if (response.data.error) setWarning(response.data.error);
            else setWarning("Cannot match your email and password");
          } else {
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
  function inputAttribute(name, value) {
    setLoginData({ ...loginData, [name]: value });
  }

  const checkFormat = (email, password) => {
    if (!emailValidator.validate(email)) return false;
    if (/^.{8,16}$/.test(password) === false) return false;
    return true;
  };

  function checkButton() {
    if (props.button)
      return (
        <button className="fa fa-close" onClick={props.closeLogin}></button>
      );
  }

  return (
    <div id="action-form">
      {props.button && (
        <button className="close" onClick={props.closeLogin}>
          X
        </button>
      )}
      <p>Login</p>
      <form>
        <Email inputAttribute={inputAttribute} />
        <Password inputAttribute={inputAttribute} />
      </form>
      {warning && <Warning context={warning} />}
      <button
        className="confirm"
        onClick={handleSubmit}
        onBlur={() => setWarning("")}
      >
        Login
      </button>
      <button className="switch" onClick={props.openRegister}>
        Do not have account?
      </button>
    </div>
  );
}
