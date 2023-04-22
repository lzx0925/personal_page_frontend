import React from "react";
import "./style.css";
import { useState } from "react";
import GameBar from "./extendBar/GameBar.js";
import ProfileBar from "./extendBar/ProfileBar.js";
import SettingBar from "./extendBar/SettingBar.js";
import { useSelector } from "react-redux";

export default function NavigationBar() {
  const { user } = useSelector((state) => ({ ...state }));
  const [extendBar, setExtendBar] = useState("");
  const barHandler = (barName) => {
    setExtendBar(barName);
  };

  function userHandler() {
    if (user) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/login";
    }
  }

  return (
    <nav className="navigation-bar">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="main-bar">
        <div className="left">
          <button className="home" onClick={() => (window.location.href = "/")}>
            Home
          </button>
          <button
            className="introduction"
            onClick={() => (window.location.href = "/about-me")}
          >
            About Me
          </button>
          <div
            className="game-bar"
            onMouseOver={() => barHandler("game")}
            onMouseOut={() => barHandler("")}
          >
            <button
              className="game"
              onClick={() => (window.location.href = "/games")}
            >
              Something Fun
            </button>
            {extendBar == "game" && <GameBar />}
          </div>
        </div>
        <div className="middle"></div>
        <div className="right">
          <button
            className="message-board"
            onClick={() => (window.location.href = "/messageboard")}
          >
            Message Board
          </button>
          <div
            className="setting-bar"
            onMouseOver={() => barHandler("setting")}
            onMouseOut={() => barHandler("")}
          >
            <button
              className="fa fa-gear"
              onClick={() => (window.location.href = "/setting")}
            ></button>
            {extendBar == "setting" && <SettingBar />}
          </div>
          <div
            className="user-bar"
            onMouseOver={() => barHandler("profile")}
            onMouseOut={() => barHandler("")}
          >
            <img
              className="headshot"
              src={user ? user.headshot : "/defaultHead.jpg"}
              alt="headshot"
              onClick={userHandler}
            />
            {extendBar == "profile" && <ProfileBar login={user} />}
          </div>
        </div>
      </div>
    </nav>
  );
}
