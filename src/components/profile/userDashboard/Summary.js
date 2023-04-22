import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
export default function Summary() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="summary">
      <img className="summary-headshot" src={user.headshot} alt="headshot" />
      <div>{user.username}</div>
      <div>{user.email}</div>
      <div>{user.CreateAt}</div>
      {user.firstname && <div>{user.firstname}</div>}
      {user.lastname && <div> {user.lastname}</div>}
      {user.gender && <div>{user.gender}</div>}
      {user.birthday && <div>{user.birthday}</div>}
    </div>
  );
}
