import React from "react";
import "./style.css";
import { useEffect, useState, useRef } from "react";
import HrefButton from "../../common/HrefButton";
import { breakList } from "prelude-ls";

export default function ExtendBar({ vertical, bar }) {
  return vertical ? (
    <>
      <HrefButton class="game" address="/games" buttonName="PROJECTS" />
      <HrefButton class="aboutme" address="/about-me" buttonName="INTERESTS" />
      <HrefButton class="msg" address="/messageboard" buttonName="MESSGAE" />
      <HrefButton class="setting" address="/setting" buttonName="SETTINGS" />
      <HrefButton class="profile" address="/profile" buttonName="PROFILE" />
    </>
  ) : (
    <>{bar}</>
  );
}
