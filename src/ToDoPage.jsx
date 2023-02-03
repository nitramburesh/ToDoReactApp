import { useState, useEffect } from "react";

import Loading from "./Loading";
import ToDoItem from "./ToDoItem";
import Wrapper from "./Atom.jsx/Wrapper";
import Button from "./Atom.jsx/Button";
const ToDoPage = ({ loading, setLoading }) => {
  const [todos, setTodos] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");

  const loadItemsFromStorage = () => {
    return JSON.parse(localStorage.getItem("TODOS"));
  };
  const saveToStorage = (todos) => {
    return localStorage.setItem("TODOS", JSON.stringify(todos));
  };
  const deleteAllItems = () => {
    setTodos([]);
    localStorage.clear();
  };

  useEffect(() => {
    console.log(loadItemsFromStorage());
    setTodos(loadItemsFromStorage());
  }, []);

  const sendRequest = async () => {
    setLoading(true);
    await fetch("https://dummyjson.com/todos")
      .then((response) => response.json())
      .then(({ todos }) => {
        setTodos(todos);
        setLoading(false);
      });
  };
  const handleClickedTodo = ({ id, completed }) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !completed };
        }
        return todo;
      })
    );
  };
  const handleDeleteTodo = ({ id }) => {
    const filteredList = todos.filter((todo) => todo.id !== id);
    saveToStorage(filteredList);
    setTodos(filteredList);
  };
  const ToDos = () => {
    const showSelectedTab = () => {
      const viewTodo = (todo) => (
        <ToDoItem
          title={todo.todo}
          clickedTodo={() => handleClickedTodo(todo)}
          clickedDeleteTodo={() => handleDeleteTodo(todo)}
          completed={todo.completed}
          id={todo.id}
          key={todo.id}
        />
      );
      if (selectedTab === "all") {
        return todos?.map((todo) => {
          return viewTodo(todo);
        });
      } else if (selectedTab === "done") {
        return todos
          ?.filter((todo) => {
            return todo.completed === true;
          })
          .map((todo) => {
            return viewTodo(todo);
          });
      } else if (selectedTab === "not done") {
        return todos
          ?.filter((todo) => {
            return todo.completed === false;
          })
          .map((todo) => {
            return viewTodo(todo);
          });
      }
    };
    return loading ? <Loading /> : showSelectedTab();
  };
  const Tabs = ({ tabs }) => {
    return tabs.map((tab) => {
      const isSelected = tab === selectedTab;
      return (
        <Button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          isSelected={isSelected}
          className={isSelected ? "selected-tab" : "unselected-tab"}
        >
          {tab}
        </Button>
      );
    });
  };
  return (
    <div>
      <h1>This is TODO APP!</h1>
      <Wrapper className="wrap-center">
        <Wrapper className="row">
          <Button className="button" onClick={sendRequest}>
            Fetch todos
          </Button>
          <Button className="button" onClick={() => saveToStorage(todos)}>
            Save
          </Button>
          <Button className="button" onClick={deleteAllItems}>
            Delete all
          </Button>
        </Wrapper>
        <Wrapper className="wrap-left">
          <Wrapper className="row">
            <Tabs tabs={["all", "done", "not done"]} />
          </Wrapper>
          <ToDos />
        </Wrapper>
      </Wrapper>
    </div>
  );
};

export default ToDoPage;
