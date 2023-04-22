import React from "react";
import "./style.css";
import { useState } from "react";
import NavigationBar from "../navi/NavigationBar";
import { useSelector } from "react-redux";

export default function Home() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="home-container">
      <link
        href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
        rel="stylesheet"
        type="text/css"
      />
      <NavigationBar />
      <div className="home-content">
        {!user && <h1 className="greeting-title">Hi! I'm Zixin,</h1>}
        {user && (
          <h1 className="greeting-title">Welcome back, {user.username}</h1>
        )}
        <h2 className="greeting-content">
          Welcome to my personal webpage!
          <br />
          <br />
          Everything you see here, from the code to the emoticons, was crafted
          by my own two hands.
          <br />
          <br />I hope you can see the love that went into every pixel and enjoy
          your stay!
        </h2>
        <div className="contact">
          <button className="icon fa fa-instagram"></button>
          <button className="icon fa fa-linkedin-square"></button>
          <button className="icon fa fa-envelope"></button>
          <button className="icon fa fa-mobile-phone"></button>
          <button className="icon fa fa-facebook"></button>
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
