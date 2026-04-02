import React from "react";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onReset,
  hasSearched,
}) => {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Looking for a user ?"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button onClick={onSearch} className="search-button">
        Search
      </button>
      {hasSearched && (
        <button onClick={onReset} className="reset-button">
          Reset
        </button>
      )}
    </div>
  );
};

export default SearchBar;
