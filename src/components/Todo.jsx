import React from "react";

const Todo = ({ text, todo, todos, setTodos }) => {
  //Delete handler accepts the list of all todos, and then checks each item in that list for whether or not it matches the todo item for which the function is run on then filters out matches
  //Wrap in anaonymous function
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  const completeHandler = () => {
    //cycles through each item in 'todos' and inverts an items 'completed' property whenever the id matches (was clicked on)
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  return (
    <div className="todo">
      {/* javascript line below toggles on/off the completed class. Css targets items with the completed class and adds a line through the text to indicate completion */}

      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {text}
      </li>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;
