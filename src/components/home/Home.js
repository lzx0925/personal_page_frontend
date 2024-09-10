import React from "react";
import "./style.css";
import { useState } from "react";
import NavigationBar from "../nav/NavigationBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="home-page">
      <div className="intro-content">
        <p>
          {user ? "Welcome back, ".concat(user.username) : "Hi, My name is"}
        </p>
        <p>Gwen Li</p>
        <p>
          A self-taught <span> Frontend Developer</span>,
          <br />
          building efficient websites and web applications using
          <span> React.js, HTML5 and CSS3</span>.
        </p>
        <div />
        <div className="contact">
          <Link
            className="fa fa-instagram"
            to="https://www.instagram.com/gwen_995/"
            target="_blank"
          />

          <Link
            className="fa fa-linkedin"
            to="https://www.linkedin.com/in/gwenli/"
            target="_blank"
          />

          <Link
            className="fa fa-github"
            to="https://github.com/lzx0925"
            target="_blank"
          />
        </div>
      </div>
      <div className="photo-content" />
    </div>
  );
}
