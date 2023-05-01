import React from "react";
import "./style.css";
import { useState } from "react";
import NavigationBar from "../navi/NavigationBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="home-container">
      <link
        href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
        rel="stylesheet"
        type="text/css"
      />
      <div className="home-content">
        <div className="greeting">
          <b>{user ? "Welcome back, ".concat(user.username) : "Hi! I'm Zixin,"}</b>
          <p>Welcome to my personal webpage!</p>
          <p>
            Everything you see here, from the code to the emoticons, was crafted
            by my own two hands.
          </p>
          <p>
            I hope you can see the love that went into every pixel and enjoy
            your stay!
          </p>
        </div>
        <div className="contact">
          <Link to="https://www.instagram.com/gwen_995/" target="_blank">
            <button className="icon fa fa-instagram" id="instagram"></button>
          </Link>
          <Link
            to="https://www.linkedin.com/in/zixin-li-724642184/"
            target="_blank"
          >
            <button
              className="icon fa fa-linkedin-square"
              id="linkedin"
            ></button>
          </Link>
          <button className="icon fa fa-envelope" id="envelope"></button>
          <button className="icon fa fa-mobile-phone" id="mobile"></button>
          <Link to="https://github.com/lzx0925" target="_blank">
            <button className="icon fa fa-github" id="github"></button>
          </Link>
        </div>
      </div>
    </div>
  );
}
/*         <button className="gmail"></button>
          <button className=" linkedin"></button>
          <button className=" message"></button>
          <button className=" phone"></button>
          <button className=" tiktok"></button>
          <button className=" facebook"></button> */
