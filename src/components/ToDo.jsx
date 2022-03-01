import { useCallback, useState } from "react";
import "./ToDo.css";

const ToDo = ({ data, toggle, update }) => {
  const handleToggle = useCallback(() => {
    toggle(data);
  }, [toggle, data]);

  const [inputText, setInputText] = useState(data.title);
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleChange = ({ target }) => {
    setInputText(target.value);
  };

  const handleUpdate = () => {
    const updatedData = { ...data, title: inputText, completeStatus: false };
    update(updatedData);
    setIsEdit(false);
  };
  return (
    <div
      className={
        data.completeStatus === true
          ? "complete todo-container"
          : "incomplete todo-container"
      }
    >
      {!isEdit && (
        <div className="todo">
          <label className="cursor-pointer" onClick={handleToggle}>
            {data.title}
          </label>
          <button
            className={
              data.completeStatus === true
                ? "button-incomplete cursor-pointer"
                : "button-complete cursor-pointer"
            }
            onClick={handleEdit}
          >
            edit
          </button>
        </div>
      )}

      {isEdit && (
        <div className="todo">
          <input type="text" value={inputText} onChange={handleChange} />
          <button className="cursor-pointer" onClick={handleUpdate}>
            update
          </button>
        </div>
      )}
    </div>
  );
};

export default ToDo;
