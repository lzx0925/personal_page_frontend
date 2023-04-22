import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Login from "./input/Login";
import Register from "./input/Register";
import NavigationBar from "../navi/NavigationBar";
export default function RegisterPage() {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <div>
      <NavigationBar />
      <div className="action-container">
        <Register
          openLogin={() => {
            setShowLogin(true);
          }}
        />
        {showLogin && (
          <Login
            button={showLogin}
            closeLogin={() => {
              setShowLogin(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
