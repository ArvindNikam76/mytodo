import { createStore } from "redux";
const todolist = [];
const toDosReducer = (state = { todos: todolist }, action) => {
  if (action.type === "create") {
    const todos = [...action.payload];
    return { ...state, todos };
  }

  if (action.type === "add") {
    const todos = [...state.todos, action.payload];
    return { ...state, todos };
  }

  if (action.type === "update") {
    const index = state.todos.findIndex(
      (todo) => todo.id === action.payload.id
    );
    const tempToodos = state.todos;
    tempToodos[index].title = action.payload.title;
    tempToodos[index].completeStatus = action.payload.completeStatus;
    return { ...state, todos: tempToodos };
  }

  if (action.type === "toggle") {
    const newSate = state.todos.map((todo) => {
      if (todo.id === action.payload.id) {
        todo.completeStatus = !todo.completeStatus;
      }
      return todo;
    });

    return { ...state, todos: newSate };
  }

  return state;
};
const store = createStore(toDosReducer);
export default store;
