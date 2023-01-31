import { useState, useEffect } from "react";

const useFetch = (loading) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(loading)
  useEffect(() => {
    const fetchToDos = async () => {
      const fetchedTodos = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      ).then((response) => response.json());
      setTodos(fetchedTodos);
      setIsLoading(false);
    };
    fetchToDos();
  }, []);
  return [todos, isLoading]
}
export default useFetch;