import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import ProfileNav from "./userDashboard/ProfileNav";
export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (!user) {
      console.log("user not logged in");
      navigate("/login");
    }
  }, []);
  return (
    <div id="main-container">
      {user && <ProfileNav />}
    </div>
  );
}
