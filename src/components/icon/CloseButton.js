import React from "react";
import "./style.css";

export default function CloseButton({ color, handleClose }) {
  const styles = { backgroundColor: color };

  const handleClickClose = (e) => {
    handleClose();
  };
  return (
    <button
      className="button close"
      id="close-button"
      onClick={(e) => {
        handleClickClose();
      }}
    >
      <div className="bar1" style={styles}></div>
      <div className="bar2" style={styles}></div>
    </button>
  );
}
