//See for resource https://www.youtube.com/watch?v=pCA4qpQDZD8

import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { json } from "mathjs";

function App() {
  const [recipeInputText, setRecipeInputText] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeLink, setRecipeLink] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");

  //inputText is defined in the top level so it can be passed between components as a prop
  //useState defines the function of how to reset the variable
  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //Take status and check which case is met
  //Once case is met, then setFilteredTodos using the filter function

  //Returns all ingredients from a recipe
  function getIngredients(item) {
    return item.recipe.ingredients.map(function (item) {
      return item["food"];
    });
  }

  //fetch pulls data from the endpoint (string passed in) and returns a promise
  //.then fires a function when/if the promise is resolved
  //.then returns a response objectd (not actually the data). To get the data from the response object, we tack on .json which passes the json data into a javascript object for us
  //the second .then returns the data from the javascript object returned from the previous javascript object

  function updateRecipe(search) {
    const formattedSearch = search.replace(" ", "%20"); //Formats to pull data from api
    fetch(
      "https://api.edamam.com/api/recipes/v2?type=public&q=" +
        formattedSearch +
        "&app_id=8078911c&app_key=8f5dedc8e3382a4934221714838f38a7"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const item = data.hits[0];
        setRecipeLink(item.recipe.shareAs); //return link
        setRecipeTitle(item.recipe.label); //return title
        setRecipeIngredients(getIngredients(item)); //return ingredients
      });
    getLocalTodos();
  }

  //runs whenever the prop in the brackets changes
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
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

  //save to local storage
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

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
        recipeIngredients={recipeIngredients}
        setRecipeIngredients={setRecipeIngredients}
        updateRecipe={updateRecipe}
        recipeInputText={recipeInputText}
        setRecipeInputText={setRecipeInputText}
      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
