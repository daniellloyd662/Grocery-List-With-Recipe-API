import React, { useEffect } from "react";

const Form = ({
  //#region =============================Pass in props =======================================
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  recipeIngredients,
  updateData,
  recipeInputText,
  setRecipeInputText,
  data,
  //#endregion ===============================================================================
}) => {
  //#region =============================Add Todo Item =========================================
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
  //#endregion =========================================================================

  //#region ============================Add Recipe Ingredients ==============================

  const dataInputTextHandler = (e) => {
    setRecipeInputText(e.target.value);
  };
  //Creates an array of ingredients with a unique id, name, and completed status using ingredientsArray
  const addIngredients = (e) => {
    e.preventDefault();
    //update recipe runs asynchronously since it requires access to the database to run
    updateData(recipeInputText);
    //Math.random is used to assign a 'unique' id (Not actually unique but high probability that it is)
  };

  useEffect(() => {
    const ingredientsArray = recipeIngredients.map((ingredient) => {
      const item = {};
      item.text = ingredient;
      item.id = Math.random(1000) * 1000;
      item.completed = false;
      return item;
    });
    setTodos([...todos, ...ingredientsArray]);
    //Resets the input text to "" after submission
    setRecipeInputText("");
  }, [recipeIngredients]);

  const submitRecipeHandler = (e) => {
    // addIngredients(e);
    e.preventDefault();
    updateData(recipeInputText);
    console.log(data);

    data.map((value, key) => {
      console.log(value.recipe.shareAs);
    });
  };

  // useEffect(() => {
  //   console.log("useEffect");
  //   updateData(recipeInputText);
  //   console.log(data);
  //   data.map((value, key) => {
  //     console.log(value.recipe.shareAs);
  //   });
  // }, [recipeInputText]);

  //#endregion ==========================================================================

  //#region ============================Filter Handler================================
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  //#endregion ==========================================================================

  //#region ============================Return HTML ============================================
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

      {/* old search bar */}
      <div className="search">
        <input
          onChange={dataInputTextHandler}
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
        {data.map((value, key) => {
          return (
            <a
              className="dataItem"
              href={value.recipe.shareAs}
              target="_blank"
              key={value.recipe.uri}
            ></a>
          );
        })}
      </div>
    </form>
  );
  //#endregion ==============================================================
};

export default Form;
