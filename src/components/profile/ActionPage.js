import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Login from "./input/Login";
import Register from "./input/Register";
export default function LoginPage(props) {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [action, setAction] = useState({ login: false, register: false });
  useEffect(() => {
    if (user) navigate("/profile");
    else if (props && props.action === "login")
      setAction({ login: "fixed", register: false });
    else if (props && props.action === "register")
      setAction({ login: false, register: "fixed" });
  }, []);

  useEffect(() => {
    console.log("show register", showRegister, " button?");
  }, [showRegister]);

  return (
    <div className="action-container">
      {action.login==="fixed" && (
        <Login
          openRegister={() => setAction({ ...action, register: true })}
        />
      )}
      {action.register && (
        <Register
          button={action.register !== "fixed"}
          closeRegister={() => setAction({ ...action, register: false })}
          openLogin={() => setAction({ ...action, login: true })}
        />
      )}
      {action.login===true && (
        <Login
          button={action.login !== "fixed"}
          openRegister={() => setAction({ ...action, register: true })}
          closeLogin={() => setAction({ ...action, login: false })}
        />
      )}
    </div>
  );
}
