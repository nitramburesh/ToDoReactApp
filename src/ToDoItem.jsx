import "./App.css";
import { useState } from "react";
const ToDoItem = ({ completed, title, id, onChange }) => {
  return (
    <span className="todoitem" onClick={onChange}>
      <input type="checkbox" checked={completed} onChange={onChange} key={id} />
      <p> {title}</p>
    </span>
  );
};

export default ToDoItem;
