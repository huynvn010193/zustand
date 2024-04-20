import React from "react";
import "./Colunm.css";
import Task from "./Task";

// eslint-disable-next-line react/prop-types
export default function Column({ state }) {
  return (
    <div className="column">
      <p>{state}</p>
      <Task title="Todo" />
    </div>
  );
}
