import React from "react";
import "./style.css";
import { useState } from "react";
import PostForm from "./PostForm";
import AllPosts from "./AllPosts";
import NavigationBar from "../nav/NavigationBar";

export default function MessageBoard() {
  return (
    <div className="message-board-container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <NavigationBar />
      <PostForm />
      <AllPosts />
    </div>
  );
}
