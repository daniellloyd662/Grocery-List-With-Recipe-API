//See for resource https://www.youtube.com/watch?v=pCA4qpQDZD8
//#region ==============================Imports====================================
import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { json } from "mathjs";
import RecipeData from "./RecipeData.json";

//#endregion =====================================================================

function App() {
  //#region ==================Define variables using useState====================
  //inputText is defined in the top level so it can be passed between components as a prop
  //useState defines the function of how to reset the variable
  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //Take status and check which case is met
  //Once case is met, then setFilteredTodos using the filter function

  //#endregion ==========================================================================

  //#region =================Pull recipe parameters from API===============
  function getIngredients(item) {
    return item.recipe.ingredients.map(function (item) {
      return item["food"];
    });
  }
  //fetch pulls data from the endpoint (string passed in) and returns a promise
  //.then fires a function when/if the promise is resolved
  //.then returns a response objectd (not actually the data). To get the data from the response object, we tack on .json which passes the json data into a javascript object for us
  //the second .then returns the data from the javascript object returned from the previous javascript object

  //#endregion =====================================================================

  //#region =================Filter todos on list update================================
  //runs whenever the prop in the brackets changes
  useEffect(() => {
    filterHandler();
    // saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      case "all":
        setFilteredTodos(todos);
        break;
    }
  };
  //#endregion ==============================================================

  //#region =================Save to local storage (Under construction) ==================
  // const saveLocalTodos = () => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // };
  // const getLocalTodos = () => {
  //   if (localStorage.getItem("todos") === null) {
  //     localStorage.setItem("todos", JSON.stringify([]));
  //   } else {
  //     let todoLocal = JSON.parse(localStorage.getItem("todos"));
  //     setTodos(todoLocal);
  //   }
  // };
  //#endregion =============================================================

  //#region =================Return HTML and pass in props=======================
  return (
    <div className="App">
      <header>
        <h1>Grocery List</h1>
      </header>
      {/* Pass in setInputText as a prop */}
      <Form
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        inputText={inputText}
        setStatus={setStatus}
        data={RecipeData}
      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
  //#endregion =============================================================================
}

export default App;
