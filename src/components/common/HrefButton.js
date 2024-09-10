import React from "react";
import "./style.css";

export default function HrefButton({ className, address, buttonName }) {
  console.log(address);
  return (
    <button
      className={className}
      onClick={() => (window.location.href = { address })}
    >
      {buttonName}
    </button>
  );
}
