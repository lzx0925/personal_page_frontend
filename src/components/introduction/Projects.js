import React from "react";
import "./style.css";
import { useState, useEffect } from "react";

export default function Projects() {
  const [spin, setSpin] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [detail, setDetail] = useState();
  const spinHandler = (e) => {};

  useEffect(
    (e) => {
      console.log(666, e);
      const front = document.getElementById("front").style;
      const end = document.getElementById("end").style;
      console.log(spin);
      if (!spin || clicked) {
        front.animationPlayState = "paused";
        end.animationPlayState = "paused";
      } else if (!clicked) {
        front.animationPlayState = "running";
        end.animationPlayState = "running";
      }
    },
    [spin, clicked]
  );

  return (
    <section id="img1" className="projects">
      <div className="left-section">
        <div className="content">
          <p>Projects</p>
        </div>
        {clicked && (
          <div className="project-introduction">
            <div className="introduction-title">
              {detail ? detail.name : ""}
            </div>
            <div className="introduction-content">
              {detail ? detail.content : ""}
            </div>
          </div>
        )}
      </div>
      <div
        className="main-content"
        onMouseEnter={(e) => {
          setSpin(false);
        }}
        onMouseLeave={(e) => {
          setSpin(true);
        }}
        onClick={(e) => {
          setSpin(false);
          setClicked(true);
          console.log(
            6666,
            document.getElementById(e.target.id).parentElement.childNodes[1].textContent
          );
          setDetail({
            name: document.getElementById(e.target.id).parentElement
              .childNodes[1].textContent,
            content: "This is content",
          });
        }}
      >
        <div className="front" id="front">
          <div className="project" id="proj1">
            <div className="project-photo" id="p-photo1"></div>
            <div className="project-name">project 1</div>
          </div>
          <div className="project" id="proj2">
            <div className="project-photo" id="p-photo2"></div>
            <div className="project-name">project 2</div>
          </div>
          <div className="project" id="proj3">
            <div className="project-photo" id="p-photo3"></div>
            <div className="project-name">project 3</div>
          </div>
          <div className="project" id="proj4">
            <div className="project-photo" id="p-photo4"></div>
            <div className="project-name">project 4</div>
          </div>
        </div>
        <div className="end" id="end">
          <div className="project" id="proj5">
            <div className="project-photo" id="p-photo5"></div>
            <div className="project-name">project 5</div>
          </div>
          <div className="project" id="proj6">
            <div className="project-photo" id="p-photo6"></div>
            <div className="project-name">project 6</div>
          </div>
          <div className="project" id="proj7">
            <div className="project-photo" id="p-photo7"></div>
            <div className="project-name">project 7</div>
          </div>
          <div className="project" id="proj8">
            <div className="project-photo" id="p-photo8"></div>
            <div className="project-name">More... </div>
          </div>
        </div>
      </div>
    </section>
  );
}
