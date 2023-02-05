import { useState, useEffect } from "react";

import Loading from "../Loading";
import ToDoItem from "../ToDoItem";
import Wrapper from "../Atom/Wrapper";
import Button from "../Atom/Button";
import { v1 as generateId } from "uuid";
import en from "./../Translations/en.json";
import ru from "./../Translations/ru.json";

const ToDoPage = ({ loading, setLoading, language }) => {
  const [error, setError] = useState({ message: "", isError: false });
  const [todos, setTodos] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [addTodo, setAddTodo] = useState("");

  const translations = language === "english" ? en : ru;

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
    setTodos(loadItemsFromStorage());
  }, []);

  const sendRequest = async () => {
    setLoading(true);
    try {
      await fetch("https://dummyjson.com/todos")
        .then((response) => response.json())
        .then(({ todos }) => {
          setTodos(todos);
          setLoading(false);
        });
    } catch (error) {
      handleError("Error loading source...");
      setLoading(false);
    }
  };
  const handleError = (message) => {
    setError({ isError: true, message: message });
    setTimeout(() => setError({ isError: false, message: "" }), 3000);
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
    const filteredList = todos?.filter((todo) => todo.id !== id);
    saveToStorage(filteredList);
    setTodos(filteredList);
  };
  const handleAddTodo = () => {
    if (addTodo.length > 0) {
      todos?.unshift({ id: generateId(), todo: addTodo, completed: false });
    } else {
      handleError("TODO is too short...");
    }
    saveToStorage(todos);
    setAddTodo("");
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
      const filteredTodos = todos?.filter((todo) =>
        todo.todo.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      );
      if (selectedTab === "all") {
        return filteredTodos?.map((todo) => {
          return viewTodo(todo);
        });
      } else if (selectedTab === "done") {
        return filteredTodos
          ?.filter((todo) => {
            return todo.completed === true;
          })
          .map((todo) => {
            return viewTodo(todo);
          });
      } else if (selectedTab === "not done") {
        return filteredTodos
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
      <h1 className={error.isError ? "error-heading" : "heading"}>
        {error.isError ? error.message : translations.text.welcomeHeading}
      </h1>
      <Wrapper className="wrap-center">
        <Wrapper className="row">
          <Button className="button" onClick={sendRequest}>
            {translations.buttons.loadItems}
          </Button>
          <Button className="button" onClick={() => saveToStorage(todos)}>
            {translations.buttons.save}
          </Button>
          <Button className="button" onClick={deleteAllItems}>
            {translations.buttons.deleteAllItems}
          </Button>
        </Wrapper>
        <Wrapper className="wrap-left">
          <Wrapper className="row">
            <Tabs tabs={["all", "done", "not done"]} />
          </Wrapper>
          <input
            className="input"
            type="text"
            placeholder={translations.placeholders.searchItems}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <Wrapper className="row">
            <input
              className={"input"}
              type="text"
              placeholder={translations.placeholders.addItem}
              value={addTodo}
              onChange={(e) => {
                setAddTodo(e.target.value);
              }}
            />
            <Button className="small-button" onClick={handleAddTodo}>
              +
            </Button>
          </Wrapper>

          <ToDos />
        </Wrapper>
      </Wrapper>
    </div>
  );
};

export default ToDoPage;
