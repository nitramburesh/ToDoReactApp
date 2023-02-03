import "./App.css";
import Button from "./Atom.jsx/Button";
const ToDoItem = ({ completed, title, id, clickedTodo, clickedDeleteTodo }) => {
  return (
    <span className="todoitem">
      <input
        type="checkbox"
        checked={completed}
        onChange={clickedTodo}
        key={id}
      />
      <p> {title}</p>
      <Button className="delete-button" onClick={clickedDeleteTodo}>
        delete
      </Button>
    </span>
  );
};

export default ToDoItem;
