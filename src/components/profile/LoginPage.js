import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Login from "./input/Login";
import Register from "./input/Register";
import NavigationBar from "../navi/NavigationBar";
export default function LoginPage() {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div>
      <NavigationBar />
      <div className="action-container">
        <Login
          openRegister={() => {
            setShowRegister(true);
          }}
        />
        {showRegister && (
          <Register
            button={showRegister}
            closeRegister={() => {
              setShowRegister(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
