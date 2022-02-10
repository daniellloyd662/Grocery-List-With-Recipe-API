//#region ==========================SearchIcon ==============================
import React from "react";
import "./searchbar.css";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ placeholder, data }) => {
  // console.log(data);
  // data.map((value, key) => {
  //   // console.log(value.name);
  // });
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} />
        <div className="searchIcon">
          <SearchIcon />
        </div>
      </div>
      <div className="dataResult">
        {data.map((value, key) => {
          return (
            <div className="dataItem" href={value.link} key={value.id}>
              {value.name}
            </div>
          );
        })}
      </div>
    </div>
    /*
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
      */
  );
};

export default SearchBar;
