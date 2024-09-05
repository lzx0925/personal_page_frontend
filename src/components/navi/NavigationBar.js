import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import GameBar from "./extendBar/GameBar";
import ProfileBar from "./extendBar/ProfileBar";
import SettingBar from "./extendBar/SettingBar";
import "./style.css";

export default function NavigationBar(props) {
  const { user } = useSelector((state) => ({ ...state }));
  const [bar, setBar] = useState();
  const [open, setOpen] = useState();
  const [isMobile, setIsMobile] = useState();
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
    console.log("open is", open, " bar is ", bar);
    const extendBars = document.getElementsByClassName("extend-nav");
    const curBar = isMobile ? extendBars[1] : extendBars[0];
    if (open && bar) {
      curBar.style.animation = "open-extend 0.6s ease-in-out forwards";
    } else if (open === false) {
      curBar.style.animation = "close-extend 0.6s ease-in-out forwards";
      hoverTimeoutRef.current = setTimeout(() => {
        setBar(false);
      }, 600); //确保关闭动画完成后Bar内容清空
    }
  }, [open, bar]);

  const handleResize = () => {
    //检查当前是pc-mode或者mobile-mode在display
    setIsMobile(
      window.getComputedStyle(document.getElementById("pc-mode")).display ===
        "none"
    );
  };

  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div id="pc-mode">
        <nav className="navigation-bar" id="nav">
          <div className="left">
            <button
              className="home"
              onClick={() => (window.location.href = "/")}
            >
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
          <div className="right">
            <button
              className="message-board"
              onClick={() => (window.location.href = "/messageboard")}
            >
              Message Board
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
        </nav>
        <div
          id="extend-nav"
          className="extend-nav"
          onMouseEnter={() => {
            clearTimeout(hoverTimeoutRef.current); // Cancel close delay when hovering over extendable bar
          }}
          onMouseLeave={handleMouseLeave}
        >
          {bar ? bar[1] : null}
        </div>
      </div>
      <div id="mobile-mode">
        <nav className="navigation-bar mobile" id="nav">
          <div className="left">
            <button
              className="home"
              onClick={() => (window.location.href = "/")}
            >
              <p>Zixin Li</p>
            </button>
          </div>
          <div className="right">
            <button
              className={`menu ${open ? "change" : ""}`}
              id="menu"
              onClick={() => {
                setOpen(!open);
                setBar(!bar);
              }}
            >
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </button>
          </div>
        </nav>

        <div id="extend-nav" className="extend-nav">
          <button
            className="game"
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
          <button
            className="message-board"
            onClick={() => (window.location.href = "/messageboard")}
          >
            Message Board
          </button>
          <button
            className="setting"
            onClick={() => (window.location.href = "/setting")}
          >
            Setting
          </button>

          <button className="profile">Profile</button>
        </div>
      </div>
    </>
  );
}
{
  /* <button
              className="setting"
              onClick={() => (window.location.href = "/setting")}
              onMouseEnter={() => handleMouseEnter(["setting", <SettingBar />])}
              onMouseLeave={handleMouseLeave}
            >
              &#x2699;
            </button> */
}
