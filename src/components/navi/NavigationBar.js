import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import GameBar from "./extendBar/GameBar";
import ProfileBar from "./extendBar/ProfileBar";
import SettingBar from "./extendBar/SettingBar";
import "./style.css";

export default function NavigationBar(props) {
  const { user } = useSelector((state) => ({ ...state }));
  const [bar, setBar] = useState();
  const [open, setOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);

  function userHandler() {
    if (user) window.location.href = "/profile";
    else window.location.href = "/login";
  }

  // Helper to handle opening and closing the extendable bar with delay
  const handleMouseEnter = (newBar) => {
    clearTimeout(hoverTimeoutRef.current); // Clear any previous timeout for closing

    setBar(newBar);
    setOpen(true);

    hoverTimeoutRef.current = setTimeout(() => {
      props.blur();
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current); // Clear previous timeout if exists

    hoverTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      props.unblur();
    }, 200); // Add delay to prevent flickering
  };

  useEffect(() => {
    if (open && bar) {
      document.getElementById("extend-nav").style.animation =
        "open-extend 0.6s ease-in-out forwards";
    } else if (open === false && bar) {
      document.getElementById("extend-nav").style.animation =
        "close-extend 0.6s ease-in-out forwards";
    }
  }, [open, bar]);

  return (
    <nav className="navigation-bar" id="nav">
      <div className="left">
        <button className="home" onClick={() => (window.location.href = "/")}>
          Home
        </button>
        <button
          className="game"
          onMouseEnter={() => handleMouseEnter(["game", <GameBar />])}
          onMouseLeave={handleMouseLeave}
          onClick={() => (window.location.href = "/games")}
        >
          Projects
        </button>
        <button
          className="introduction"
          onClick={() => (window.location.href = "/about-me")}
        >
          Interests
        </button>
      </div>
      <div className="middle"></div>
      <div className="right">
        <button
          className="message-board"
          onClick={() => (window.location.href = "/messageboard")}
        >
          Message Board
        </button>
        <button
          className="setting"
          onClick={() => (window.location.href = "/setting")}
          onMouseEnter={() => handleMouseEnter(["setting", <SettingBar />])}
          onMouseLeave={handleMouseLeave}
        >
          &#x2699;
        </button>
        <button
          className="profile"
          onMouseEnter={() => handleMouseEnter(["profile", <ProfileBar />])}
          onMouseLeave={handleMouseLeave}
        >
          <img
            className="headshot"
            src={user ? user.headshot : "/defaultHead.jpg"}
            alt="headshot"
            onClick={userHandler}
          />
        </button>
      </div>
      <div
        id="extend-nav"
        className="extend-bar"
        onMouseEnter={() => {
          clearTimeout(hoverTimeoutRef.current); // Cancel close delay when hovering over extendable bar
        }}
        onMouseLeave={handleMouseLeave}
      >
        {bar ? bar[1] : null}
      </div>
    </nav>
  );
}
