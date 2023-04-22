import React from "react";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm() {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  function handleSubmit() {
    console.log(message);
    axios
      .post("http://localhost:5000/sendmessage", {
        username: user.username,
        content: message,
        image: null,
      })
      .then((response) => {
        console.log(response.data.message);
        window.location.href = "/messageboard";
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }

  return (
    <div className="post">
      <link
        href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
        rel="stylesheet"
        type="text/css"
      />
      <div className="text">
        <input
          className="input-message"
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={"Hi, "+user.username+"! Say something here..."}
          required
        ></input>
        <div className="function">
          <div className="l">
            <button
              className="clear"
              onClick={() => {
                setMessage("");
              }}
            >
              Clear
            </button>
          </div>
          <div className="m"></div>
          <div className="r">
            <button className="emoji fa fa-smile-o"> </button>
            <button className="font fa fa-paint-brush"> </button>
            <button type="file" className="camera fa fa-camera-retro"> </button>
            <button className="submit" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="image"></div>
    </div>
  );
}
