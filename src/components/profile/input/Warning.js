import React from "react";
import "../style.css";

export default function Warning(props) {
  return <div className="error">{props.context}</div>;
}
