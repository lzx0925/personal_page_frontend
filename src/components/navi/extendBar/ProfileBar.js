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
    <div className="extend-bar profile">
      <div className="extendbar-lists profile-lists">
        <div className="list">
          <div className="list-name">Function</div>
          <div className="func-info">
            {login && <button className="extendbar-manager">Manage Account</button>}
            {login && (
              <button className="extendbar-logout" onClick={handleLogout}>
                Logout
              </button>
            )}
            {!login && (
              <button
                className="extendbar-login"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
            )}
            {!login && (
              <button
                className="extendbar-register"
                onClick={() => (window.location.href = "/register")}
              >
                Register
              </button>
            )}
          </div>
        </div>
        {login && (
          <div className="list">
            <div className="list-name">Personal Info</div>
            <div className="user-info">
              <img
                className="head-photo"
                src={user.headshot}
                alt="headshot"
                onClick={() => (window.location.href = "/profile")}
              />
              <div className="line"></div>
              <div className="name-gender">
                <div className="username">{user.username}</div>
                {showGender()}
              </div>
              <div className="email">{user.email}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
