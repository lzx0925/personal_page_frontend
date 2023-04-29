import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function ProfileBar() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [login, setLogin] = useState(user ? true : false);
  function handleLogout() {
    dispatch({ type: "LOGOUT", value: null });
    Cookies.remove("user");
    window.location.href = "/";
  }

  function showGender() {
    const gender =
      user.gender == "m"
        ? "fa fa-male"
        : user.gender == "f"
        ? "fa fa-female"
        : "	fa fa-genderless";
    return <div className={gender}></div>;
  }


  return (
    <div className="extend-profile" id="profile">
      <div className="function-list">
        {user && <button className="">My Message</button>}
        {user && <button className="">Game Records</button>}
        {user && <button className="">Change Password</button>}
        {user && <button className="manage">Manage Account</button>}
        {user && (
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        )}
        {user && <button className="delete">Delete Account</button>}
        {!user && (
          <button
            className="login"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        )}
        {!user && (
          <button
            className="register"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </button>
        )}
      </div>

      <div className="list">
        <div className="user-headshot">
          <img
            className="headshot"
            src={user ? user.headshot : "/defaultHead.jpg"}
            alt="headshot"
            onClick={() => (window.location.href = "/profile")}
          />
        </div>
        <div className="user-info">
          <div className="username">{user ? user.username : "visitor"}</div>
          {user && showGender()}
          {user && <div className="email">{user.email}</div>}
        </div>
      </div>
    </div>
  );
}
