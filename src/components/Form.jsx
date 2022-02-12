import React, { useEffect, useState } from "react";
import "./form.css";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";
import { filter } from "mathjs";
import Close from "@mui/icons-material/Close";
const Form = ({
  //#region =============================Pass in props =======================================
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  data,
  placeholder,

  //#endregion ===============================================================================
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  //#region =============================Add Todo Item =========================================
  //input text handler takes the event objecct e and returns the value of the object on which that event occurs
  const inputTextHandler = (e) => {
    setInputText(e.currentTarget.value);
  };
  const submitTodoHandler = (e) => {
    e.preventDefault();
    //Math.random is used to assign a 'unique' id (Not actually unique but high probability that it is)
    setTodos([
      { text: inputText, completed: false, id: Math.random(1000) * 1000 },
      ...todos,
    ]);
    //Resets the input text to "" after submission
    setInputText("");
  };
  //#endregion =========================================================================
  //#region ============================Filter Handler (To do list)================================
  const statusHandler = (e) => {
    setStatus(e.currentTarget.value);
  };
  //#endregion ==========================================================================
  //#region ============================Filter Handler (Search Menu)================================

  const handleFilter = (event) => {
    const searchWord = event.currentTarget.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      //Filter loops through each item in data and adds each item which includes the search word to 'newFilter' array
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setWordEntered("");
    setFilteredData([]);
  };
  const submitRecipeHandler = (e) => {
    e.preventDefault();
    const ingredients = data[e.currentTarget.id].ingredients;

    addIngredients(ingredients);
    //Resets the input text to "" after submission
  };

  //Appends each ingredient to the end of the current todos array
  function addIngredients(ingredients) {
    let todosArray = [...todos];
    ingredients.map((ingredient) => {
      todosArray.unshift({
        text: ingredient,
        completed: false,
        id: Math.random(1000) * 1000,
      });
    });
    setTodos(todosArray);
  }

  //#endregion ==========================================================================
  //#region ============================Return HTML ============================================
  return (
    <form>
      <div className="todo-input-container">
        <input
          onChange={inputTextHandler}
          type="text"
          className="todo-input"
          value={inputText}
        />
        <button
          id="todo-button"
          onClick={submitTodoHandler}
          className="todo-button"
          type="submit"
        >
          <AddBoxIcon id="add-todo-icon" />
        </button>
      </div>
      <div className="select-container">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      <div className="search-container">
        <div className="searchInputs">
          <input
            placeholder={placeholder}
            type="text"
            onChange={handleFilter}
            value={wordEntered}
          />
          <div className="searchIcon">
            {wordEntered === "" ? (
              <SearchIcon id="searchIcon" />
            ) : (
              <CloseIcon id="closeIcon" onClick={clearInput} />
            )}
          </div>
        </div>

        {/* This line prevents dropdown from showing when there is no filtered data */}
        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <div className="dataItem" key={value.id}>
                  <button
                    className="recipe-button"
                    onClick={submitRecipeHandler}
                    id={value.id}
                  >
                    <AddBoxIcon id="add-ingredients-icon" />
                  </button>
                  <a href={value.source} target="_blank">
                    <p>{value.name}</p>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
  //#endregion ==============================================================
};

export default Form;
