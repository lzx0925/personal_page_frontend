import React from "react";
import "./style.css";

export default function ExtendBar({ vertical, bar }) {
  return vertical ? (
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
        onClick={() => (window.location.href = "/games")}
      >
        GAMES
      </button>
      <button
        className="msg"
        onClick={() => (window.location.href = "/message-board")}
      >
        MESSAGE BOARD
      </button>
      <button
        className="setting"
        onClick={() => (window.location.href = "/setting")}
      >
        SETTINGS
      </button>
      <button
        className="profile"
        onClick={() => (window.location.href = "/profile")}
      >
        PROFILE
      </button>
    </>
  ) : (
    <>{bar}</>
  );
}
