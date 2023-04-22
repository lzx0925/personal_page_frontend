import "./style.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
const {backend_url} = require("../../../config")
export default function Summary(props) {
  const { user } = useSelector((state) => ({ ...state }));
  const { stage, setStage } = useState();
  console.log(user);
  useEffect(() => {
    if (user) {
      axios
        .post(backend_url+"/save_wordle", {
          email: user.email,
          stage: props.stage,
        })
        .then((response) => {
          console.log(response.data);
          showProgress(response.data.total, JSON.parse(response.data.record));
        })
        .catch((error) => {
          return error;
        });
    }
  }, []);

  function showProgress(total, record) {
    console.log(total, record);

    for (const key in record) {
      const percent = Math.floor((100 * record[key]) / total);
      const last = 100 - percent;
      const progressBar = document.getElementById(`stage${key}`);
      progressBar.style.setProperty(
        "--progress-percent",
        percent.toString() + "%"
      );
      progressBar.style.animation = "progress-change 4s forwards";
      progressBar.style.animationName = "progress-change";
    }
  }

  function closeMessage() {
    props.closeWarning();
  }
  return (
    <div className="summary-container wordle">
      <div className="close-button" onClick={closeMessage}>
        &#9447;
      </div>
      <div className="title">{props.status ? props.status : ""}</div>
      <div className="message">{props.message ? props.message : ""}</div>
      <div className="history">
        <div className="stage">
          1
          <div className="progress-bar">
            <div className="percent" id="stage1"></div>
          </div>
        </div>
        <div className="stage">
          2
          <div className="progress-bar">
            <div className="percent" id="stage2"></div>
          </div>
        </div>
        <div className="stage">
          3
          <div className="progress-bar">
            <div className="percent" id="stage3"></div>
          </div>
        </div>
        <div className="stage">
          4
          <div className="progress-bar">
            <div className="percent" id="stage4"></div>
          </div>
        </div>
        <div className="stage">
          5
          <div className="progress-bar">
            <div className="percent" id="stage5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
