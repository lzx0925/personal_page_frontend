import "./style.css";
import { useState, useEffect } from "react";

const projs = {
  "Facebook Clone": 1,
  "E-commerce Website Development": 2,
  "Employee Management Portal": 3,
  "Product Management System": 4,
};

export default function ProjectsPage() {
  return (
    <>
      <div id="proj-ls">
        {Object.keys(projs).map((key) => (
          <div key={key}>{key}</div>
        ))}
      </div>
    </>
  );
}
