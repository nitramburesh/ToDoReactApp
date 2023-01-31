import useFetch from "./useFetch";
import { useEffect } from "react";
import Loading from "./Loading";
import ToDoItem from "./ToDoItem";
const ToDoPage = ({ loading, setLoading }) => {
  const [todos, isLoading] = useFetch(loading);
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, todos, setLoading]);

  const viewTodos = () => {
    return (
      !isLoading && <Loading />,
      todos &&
        todos?.map((todo) => {
          return (
            <ToDoItem
              title={todo.title}
              completed={todo.completed}
              id={todo.id}
              key={todo.id}
            />
          );
        })
    );
  };
  return (
    <div>
      <h1>This is TODO APP!</h1>

      {viewTodos()}
    </div>
  );
};

export default ToDoPage;
