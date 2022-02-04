import React, { useEffect } from "react";

//setInputText is passed in as a prop
const Form = ({
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  recipeIngredients,
  updateRecipe,
  recipeInputText,
  setRecipeInputText,
}) => {
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

  const recipeInputTextHandler = (e) => {
    setRecipeInputText(e.target.value);
  };

  //Creates an array of ingredients with a unique id, name, and completed status using ingredientsArray
  const addIngredients = (e) => {
    e.preventDefault();
    console.log(recipeInputText);
    //update recipe runs asynchronously since it requires access to the database to run
    updateRecipe(recipeInputText);
    //Math.random is used to assign a 'unique' id (Not actually unique but high probability that it is)
    const ingredientsArray = recipeIngredients.map((ingredient) => {
      const item = {};
      item.text = ingredient;
      item.id = Math.random(1000) * 1000;
      item.completed = false;
      return item;
    });
    console.log(ingredientsArray);
    setTodos([...todos, ...ingredientsArray]);
    //Resets the input text to "" after submission
    setRecipeInputText("");
  };

  const submitRecipeHandler = (e) => {
    addIngredients(e);
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
      <div className="search">
        <input
          onChange={recipeInputTextHandler}
          type="text"
          className="recipe-search"
          value={recipeInputText}
        />
        <button
          onClick={submitRecipeHandler}
          className="recipe-button"
          type="submit"
        >
          <i className="fas fa-plus-square"></i>
        </button>
      </div>
    </form>
  );
};

export default Form;
