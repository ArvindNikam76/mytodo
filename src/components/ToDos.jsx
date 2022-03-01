import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./ToDo";
import "./ToDos.css";

const ToDos = () => {
  const [inputText, setInputText] = useState("");

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "create", payload: json.slice(0, 5) });
      });
  }, [dispatch]);
  const handleToggle = (data) => {
    dispatch({ type: "toggle", payload: data });
  };

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    const todo = { id: todos.length + 1, title: inputText };

    dispatch({ type: "add", payload: todo });
    setInputText("");
  };

  const handleUpdate = (data) => {
    console.log(data);
    dispatch({ type: "update", payload: data });
  };

  return (
    <div>
      <div className="search-box">
        <input type="text" value={inputText} onChange={handleInputText} />
        <button className="button-search" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <div className="container">
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              data={todo}
              update={handleUpdate}
              toggle={handleToggle}
            ></Todo>
          );
        })}
      </div>
    </div>
  );
};

export default ToDos;
