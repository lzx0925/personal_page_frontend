import React from "react";
import "./style.css";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import GameBar from "./extendBar/GameBar";
import ProfileBar from "./extendBar/ProfileBar";
import SettingBar from "./extendBar/SettingBar";

export default function NavigationBar(props) {
  const { user } = useSelector((state) => ({ ...state }));
  const property = getComputedStyle(document.documentElement);
  const minTop =
    (
      parseInt(property.getPropertyValue("--nav-height")) * -1 +
      parseInt(property.getPropertyValue("--extend-height")) * -1
    ).toString() + "px";
  const maxTop = 0;
  // console.log(minHeight, maxHeight);
  const [bar, setBar] = useState();
  const [prevBar, setPrevBar] = useState();
  const [open, setOpen] = useState();
  const [onBar, setOnBar] = useState();
  const [onExtend, setOnExtend] = useState();
  const elRef = useRef(null);

  function userHandler() {
    if (user) window.location.href = "/profile";
    else window.location.href = "/login";
  }
  useEffect(() => {
    console.log(666, bar, prevBar);
  }, [bar]);

  useEffect(() => {
    const top = elRef.current.getBoundingClientRect().top;
    console.log(
      open ? "open" : "close",
      bar ? document.getElementsByClassName("extend-" + bar[0])[0] : "none",
      "now top is",
      top
    );
    if (open && bar) {
      document.documentElement.style.setProperty(
        "--nav-lower-height",
        top.toString() + "px"
      );
      document.documentElement.style.setProperty("--nav-higher-height", maxTop);
      document.getElementById("extend-nav").style.animation =
        "open-extend 0.6s ease-in-out forwards";
      document.getElementsByClassName("extend-" + bar[0])[0].style.animation =
        "open-extend 0.6s ease-in-out forwards";
    } else if (open === false && bar) {
      document.documentElement.style.setProperty("--nav-lower-height", minTop);
      document.documentElement.style.setProperty(
        "--nav-higher-height",
        top.toString() + "px"
      );
      document.getElementById("extend-nav").style.animation =
        "close-extend 0.6s ease-in-out forwards";
      document.getElementsByClassName("extend-" + bar[0])[0].style.animation =
        "close-extend 0.6s ease-in-out forwards";

      if (top === minTop) {
        const prev = [...bar];
        setPrevBar(prev);
        setBar();
      }
    }
  }, [open]);

  function openExtendNav() {}

  return (
    <nav
      className="navigation-bar"
      id="nav"
    >
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
        <button
          className="game"
          onMouseOver={() => {
            setPrevBar(bar);
            setBar(["game", <GameBar />]);
            setOpen(true);
            setOnBar(true);
            props.blur();
          }}
          onMouseOut={() => {
            setOpen(false);
            setOnBar(false);
            props.unblur();
          }}
          onClick={() => (window.location.href = "/games")}
        >
          Something Fun
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
          onMouseOver={() => {
            setPrevBar(bar);
            setBar(["setting", <SettingBar />]);
            setOpen(true);
            setOnBar(true);
            props.blur();
          }}
          onMouseOut={() => {
            setOpen(false);
            setOnBar(false);
            props.unblur();
          }}
        >
          {/* &#x2699; */}
        </button>
        <button
          className="profile"
          onMouseOver={() => {
            setPrevBar(bar);
            setBar(["profile", <ProfileBar />]);
            setOpen(true);
            setOnBar(true);
            props.blur();
          }}
          onMouseOut={() => {
            setOpen(false);
            setOnBar(false);
            props.unblur();
          }}
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
        ref={elRef}
        onMouseOver={() => {
          setOpen(true);
          setOnExtend(true);
          props.blur();
          // document.getElementById("extend-nav").style.animationPlayState =
          //   "paused";
        }}
        onMouseOut={() => {
          setOpen(false || onBar);
          setOnExtend(false);
          false || onBar ? props.blur(): props.unblur();
        }}
      >
        <div className="space"></div>
        {bar ? bar[1] : null}
      </div>
    </nav>
  );
}
// const minHeight = property.getPropertyValue("--nav-height");
// const maxHeight =
//   (
//     parseInt(property.getPropertyValue("--nav-height")) +
//     parseInt(property.getPropertyValue("--extend-height"))
//   ).toString() + "px";
// document.documentElement.style.setProperty(
//   "--nav-lower-height",
//   height.toString() + "px"
// );
// document.documentElement.style.setProperty(
//   "--nav-higher-height",
//   maxHeight
// );

// document.documentElement.style.setProperty(
//   "--nav-lower-height",
//   minHeight
// );
// document.documentElement.style.setProperty(
//   "--nav-higher-height",
//   height.toString() + "px"
// );

// if (prevBar) {
//   const previousBar = document.getElementsByClassName(prevBar[0])[0];
//   previousBar.style.background = `linear-gradient(
//     to bottom,
//     rgba(255, 192, 203, 0.8),
//     rgba(255, 192, 203, 0.8) 50%,
//     rgb(253, 146, 164) 50%,
//     rgb(253, 146, 164)
//   ) 0 -100% / 100% 200%`;
//   previousBar.style.animation =
//     "hover-out-bar 0.1s ease-in-out 0.2s forwards";
// }
// document.getElementsByClassName(bar[0])[0].style.animation =
//   "hover-in-bar 0.2s ease-in-out 0.2s forwards";
// document.getElementsByClassName(bar[0])[0].style.background =
//   "rgb(253, 146, 164)";

// document.getElementsByClassName(
//   bar[0]
// )[0].style.background = `linear-gradient(
//         to bottom,
//         rgba(255, 192, 203, 0.8),
//         rgba(255, 192, 203, 0.8) 50%,
//         rgb(253, 146, 164) 50%,
//         rgb(253, 146, 164)
//       ) 0 -100% / 100% 200%`;
// document.getElementsByClassName(bar[0])[0].style.animation =
//   "hover-out-bar 0.1s ease-in-out 0.2s forwards";
