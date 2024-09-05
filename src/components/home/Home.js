import React from "react";
import "./style.css";
import { useState } from "react";
import NavigationBar from "../navi/NavigationBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="home-page">
      <div className="photo-content" />
      <div className="intro-content">
        <div className="text">
          <b>
            {user ? "Welcome back, ".concat(user.username) : "Hi! I'm Zixin,"}
          </b>
          <p>Welcome to my personal webpage!</p>
          <p>
            I'm a passionate developer and data scientist with an
            M.Eng. in Applied Data Science from the University of Victoria. My
            academic journey also includes a Master's in Information Science and
            a Bachelor's in Computer Science, giving me a well-rounded technical
            foundation. I specialize in backend development and full-stack
            projects, having worked on everything from scalable e-commerce
            platforms to multifunctional personal websites. I love solving
            complex problems using technologies like Python, React.js, and
            Node.js, and I'm always excited to explore new challenges in the
            tech world.
          </p>
        </div>
        <div className="contact">
          <Link to="https://www.instagram.com/gwen_995/" target="_blank">
            <button className="fa fa-instagram" id="instagram" />
          </Link>
          <Link to="https://www.linkedin.com/in/gwenli/" target="_blank">
            <button className="fa fa-linkedin" id="linkedin" />
          </Link>
          <Link to="https://github.com/lzx0925" target="_blank">
            <button className="fa fa-github" id="github" />
          </Link>
        </div>
      </div>
    </div>
  );
}
