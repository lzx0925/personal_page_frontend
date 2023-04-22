import React from "react";
import "./style.css";
import NavigationBar from "../navi/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import ProfileNav from "./userDashboard/ProfileNav";
export default function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (!user) {
      console.log("user not logged in");
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div>
      <NavigationBar />
      {user && <ProfileNav />}
    </div>
  );
}
