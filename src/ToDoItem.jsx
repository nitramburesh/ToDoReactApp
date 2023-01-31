import "./App.css";
import { useState } from "react";
const ToDoItem = ({ completed, title, id }) => {
  const [isChecked, setIsChecked] = useState(completed);
  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <span className="todoitem" onClick={checkHandler}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={checkHandler}
        key={id}
      />
      <p> {title}</p>
    </span>
  );
};

export default ToDoItem;
