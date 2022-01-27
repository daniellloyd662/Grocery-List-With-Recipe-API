import React from "react";

//setInputText is passed in as a prop
const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
  //input text handler takes the event objecct e and returns the value of the object on which that event occurs
  const inputTextHandler = (e) => {
    // console.log(e.target.value);
    setInputText(e.target.value);
  };
  const submitTodoHandler = (e) => {
    e.preventDefault();
    //Math.random is used to assign a 'unique' id (Not actually unique but high probability that it is)
    setTodos([
      ...todos,
      { text: inputText, completed: false, id: Math.random(1000) * 1000 },
    ]);
    //Resets the input text to "" after submission
    setInputText("");
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form>
      <input
        onChange={inputTextHandler}
        type="text"
        className="todo-input"
        value={inputText}
      />
      <button onClick={submitTodoHandler} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
