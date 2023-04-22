import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
export default function Record() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  return (<div>Record</div>)
}