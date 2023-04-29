import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import Projects from "./Projects";
import NavigationBar from "../navi/NavigationBar.js";

export default function Photos() {
  const [openAlbum, setOpenAlbum]=useState();

  useEffect(() =>{
    let albumList=document.getElementById("album-list");
    if(openAlbum){
      albumList
    }
  },[openAlbum])

  return (
    <section id="img2" className="photos">
      <p className="img-title">Photographs</p>
      <div className="main-content" id="album-list">
        <div className="albums-collection">
          <div className="albums" id="landscape" onClick={(e)=>setOpenAlbum(e.target.id)}></div>
          <p>Landscape</p>
        </div>
        <div className="albums-collection">
          <div className="albums" id="pet" onClick={(e)=>setOpenAlbum(e.target.id)}></div>
          <p>Pets</p>
        </div>
        <div className="albums-collection">
          <div className="albums" id="portrait" onClick={(e)=>setOpenAlbum(e.target.id)}></div>
          <p>Portrait</p>
        </div>
      </div>
    </section>
  );
}
