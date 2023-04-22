import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Edit from "./Edit";
import Record from "./Record";
import UserMessage from "./UserMessage";
import Summary from "./Summary";

export default function ProfileNav() {
  const [operate, setOperate] = useState("summary");

  return (
    <div className="profile-page">
      <div className="profile-nav">
      <button
          onClick={() => {
            setOperate("summary");
          }}
        >
          Summary
        </button>
        <button
          onClick={() => {
            setOperate("edit");
          }}
        >
          Update Profile
        </button>
        <button
          onClick={() => {
            setOperate("record");
          }}
        >
          Game Records
        </button>
        <button
          onClick={() => {
            setOperate("message");
          }}
        >
          My Message
        </button>
      </div>
      <div className="profile-dashboard">{operate == "summary" && <Summary />}</div>
      <div className="profile-dashboard">{operate == "edit" && <Edit />}</div>
    </div>
  );
}
