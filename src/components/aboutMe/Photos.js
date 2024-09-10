import React from "react";
import "./photo.css";
import { useState, useEffect, useRef } from "react";

export default function Photos() {
  const albums = new Set(["landscape", "pet", "portrait"]);
  const [openAlbum, setOpenAlbum] = useState();
  useEffect(() => {
    let albumList = document.getElementById("album-list");
    if (openAlbum) {
      // albumList.style.left = "-66.7%";
      for (let album of albums) {
        if (album !== openAlbum) {
          document.getElementById(album).parentNode.style.opacity = "0";
          setTimeout(() => {
            document.getElementById(album).parentNode.style.visibility =
              "hidden";
          }, 900);
        }
      }
      if (openAlbum === "landscape")
        // albumList.style.left =
        //   "calc(100% - var(--albums-height) * 0.9 )"; //(* 0.5 * 1 + 0.2)
        document.documentElement.style.setProperty(
          "--collections-left",
          "calc(100% - var(--albums-height) * 0.9 )"
        );
      else if (openAlbum === "pet")
        // albumList.style.left = "calc(100% - var(--albums-height) * 1.6 )";
        //(* 0.5 * 2 + 0.2)
        document.documentElement.style.setProperty(
          "--collections-left",
          "calc(100% - var(--albums-height) * 1.6 )"
        );
      else if (openAlbum === "portrait")
        //   albumList.style.left = "calc(100% - var(--albums-height) * 2.4)"; //(* 0.8 * 3 + 0.2)
        document.documentElement.style.setProperty(
          "--collections-left",
          "calc(100% - var(--albums-height) * 2.4)"
        );
      // albumList.style.transform = "scale(0.8)";
      // albumList.style.top = "calc(100vh - var(--albums-height) - 1.5rem)";
      // albumList.style.transition = "1s ease-in-out 0s";
      albumList.style.animation =
        "close-collections 1s ease-in-out forwards 0s";
    } else if (openAlbum === false) {

    }
  }, [openAlbum]);

  return (
    <section id="img2" className="photos">
      <p className="img-title">Photographs</p>
      <div className="main-content" id="album-list">
        <div className="albums-collection">
          <div
            className="albums"
            id="landscape"
            onClick={(e) => {
              openAlbum !== "landscape"
                ? setOpenAlbum(e.target.id)
                : setOpenAlbum(false);
            }}
          ></div>
          <p>Landscape</p>
        </div>
        <div className="albums-collection">
          <div
            className="albums"
            id="pet"
            onClick={(e) => setOpenAlbum(e.target.id)}
          ></div>
          <p>Pets</p>
        </div>
        <div className="albums-collection">
          <div
            className="albums"
            id="portrait"
            onClick={(e) => setOpenAlbum(e.target.id)}
          ></div>
          <p>Portrait</p>
        </div>
      </div>
    </section>
  );
}
