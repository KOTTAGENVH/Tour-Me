import React, { useState, useEffect } from "react"
import axios from "axios";
import '../css/searchbar.css';

export default function SearchBar (){
  const [selectedOption, setSelectedOption] = useState('all');

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //console.log(`Search text: ${searchText}, Selected option: ${selectedOption}`);
    // You can add your search functionality or API call here
  };

  return (
    <form onSubmit={handleFormSubmit} className="search-bar">
      <label htmlFor="search-option" className="option-label">Search Category:</label>
      <select id="search-option" value={selectedOption} onChange={handleOptionSelect} className="option-select">
        <option value="all">All</option>
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="tags">Tags</option>
      </select>
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};
