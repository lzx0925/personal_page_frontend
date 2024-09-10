import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import GameBar from "./extendBar/GameBar";
import ProfileBar from "./extendBar/ProfileBar";
import SettingBar from "./extendBar/SettingBar";
import ExtendBar from "./extendBar/ExtendBar";
import HrefButton from "../common/HrefButton";
import "./style.css";

export default function NavigationBar({ blur, unblur }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [bar, setBar] = useState();
  const [open, setOpen] = useState();
  const [vertical, setVertical] = useState();
  const extendNavRef = useRef(null); // Using ref instead of getElementById
  const hoverTimeoutRef = useRef(null);

  function userHandler() {
    if (user) window.location.href = "/profile";
    else window.location.href = "/login";
  }

  const handleMouseEnter = (newBar) => {
    clearTimeout(hoverTimeoutRef.current);
    setBar(newBar);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setOpen(false);
  };

  useEffect(() => {
    console.log("bar", bar, "open", open);
    if (extendNavRef.current) {
      const computedStyle = window.getComputedStyle(extendNavRef.current);
      console.log("Computed top value:", computedStyle.top); // Logs the computed top value
      extendNavRef.current.style.setProperty(
        "--current-top",
        computedStyle.top
      );
    }

    if (open && bar && extendNavRef.current) {
      extendNavRef.current.style.animation =
        "open-extend 0.6s ease-in-out forwards";
      hoverTimeoutRef.current = setTimeout(() => {
        blur();
      }, 200);
    } else if (open === false && extendNavRef.current) {
      extendNavRef.current.style.animation =
        "close-extend 0.6s ease-in-out forwards";
      hoverTimeoutRef.current = setTimeout(() => {
        unblur();
      }, 200);
      hoverTimeoutRef.current = setTimeout(() => {
        setBar(false);
      }, 600); // Ensure bar content clears after closing animation
    }
  }, [open, bar]);

  const handleResize = () => {
    setVertical(
      window.getComputedStyle(document.getElementById("vertical")).display ===
        "block"
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize(); // Initialize on load

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  return (
    <>
      <div id="vertical"></div>
      <nav className="navigation-bar" id="nav">
        <div className="left">
          <button className="home" onClick={() => (window.location.href = "/")}>
            {vertical ? "GWEN LI" : "HOME"}
          </button>

          {!vertical && (
            <>
              <button
                className="aboutme"
                onClick={() => (window.location.href = "/about-me")}
              >
                ABOUT ME
              </button>
              <button
                className="projects"
                onClick={() => (window.location.href = "/my-projects")}
              >
                PROJECTS
              </button>
              <button
                className="game"
                onMouseEnter={() => handleMouseEnter(<GameBar />)}
                onMouseLeave={handleMouseLeave}
                onClick={() => (window.location.href = "/games")}
              >
                GAMES
              </button>
            </>
          )}
        </div>
        <div className="right">
          {!vertical ? (
            <>
              <button
                className="msg"
                onClick={() => (window.location.href = "/messageboard")}
              >
                MESSAGE BOARD
              </button>

              <button
                className="profile"
                onMouseEnter={() => handleMouseEnter(<ProfileBar />)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="headshot"
                  src={user ? user.headshot : "/defaultHead.jpg"}
                  alt="headshot"
                  onClick={userHandler}
                />
              </button>
            </>
          ) : (
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
          )}
        </div>
      </nav>
      <>
        <div
          id="extend-nav"
          className={`extend-nav
            ${vertical ? "vertical" : vertical === false ? "horizontal" : ""}`}
          ref={extendNavRef} // Ref attached here
          //onMouseEnter={() => clearTimeout(hoverTimeoutRef.current)}
          onMouseEnter={() => handleMouseEnter(bar)}
          onMouseLeave={!vertical ? handleMouseLeave : null}
        >
          <ExtendBar vertical={vertical} bar={bar} />
        </div>
      </>
    </>
  );
}
