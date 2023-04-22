import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function UserMessage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  return <div>Message</div>;
}
