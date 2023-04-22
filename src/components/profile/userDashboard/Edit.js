import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Username from "../input/Username";
import Email from "../input/Email";
import Password from "../input/Password";
import Firstname from "../input/Firstname";
import Lastname from "../input/Lastname";
import Gender from "../input/Gender";
import Birthday from "../input/Birthday";
import Headshot from "../input/Headshot";
import Warning from "../input/Warning";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

export default function Edit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [updateData, setUpdateData] = useState({
    username: user.username,
    email: user.email,
    headshot: user.headshot,
    password: user.password,
    gender: user.gender ? user.gender : null,
    birthday: user.birthday ? user.birthday : null,
    firstname: user.firstname ? user.firstname : null,
    lastname: user.lastname ? user.lastname : null,
  });
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    console.log(updateData);
  }, [updateData]);

  useEffect(() => {
    console.log(updateData);
  }, [user]);

  function inputAttribute(name, value) {
    setUpdateData({ ...updateData, [name]: value });
  }

  function handleUpdate() {
    axios
      .post("http://localhost:5000/update", { updateData: updateData })
      .then((response) => {
        if (response.data.error) {
          setWarning(response.data.error);
        } else {
          console.log(response.data.user);
          dispatch({ type: "LOGIN", payload: response.data.user });
          Cookies.remove("user");
          Cookies.set("user", JSON.stringify(response.data.user));
          navigate("/profile", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="modify-form">
        <div className="headshot-group">
          <img
            className="edit-headshot"
            src={updateData.headshot}
            alt="headshot"
          />
          <Headshot value={user.headshot} inputAttribute={inputAttribute} />
        </div>
        <div className="input-group">
          <div className="form-group">
            <label>Email</label>
            <div className="display-email">{user.email}</div>
          </div>
          <Username value={user.username} inputAttribute={inputAttribute} />
          <Firstname value={user.firstname} inputAttribute={inputAttribute} />
          <Lastname value={user.lastname} inputAttribute={inputAttribute} />
          <Gender value={user.gender} inputAttribute={inputAttribute} />
          <Birthday value={user.birthday} inputAttribute={inputAttribute} />
          {warning && <Warning context={warning} />}
          <button className="save" onClick={handleUpdate}>
            Save
          </button>
          <button className="reset-password">Reset Password</button>
        </div>
      </div>
    </div>
  );
}
