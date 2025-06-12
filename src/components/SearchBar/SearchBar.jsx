import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "./SearchBar.css";

function SearchBar({ onSearch, placeholder = "Search" }) {
  const [value, setValue] = useState("");

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form className="searchBox" onSubmit={handleSubmit}>
      <input
        className="searchInput"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
      <button className="searchButton" type="submit">
        <IoIosSearch size={24} />
      </button>
    </form>
  );
}

export default SearchBar; 