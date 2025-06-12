import React from "react";
import { IoIosSearch } from "react-icons/io";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="searchBox">
      <input className="searchInput" type="text" placeholder="Search" />
      <button className="searchButton" type="button">
        <IoIosSearch size={24} />
      </button>
    </div>
  );
}

export default SearchBar; 