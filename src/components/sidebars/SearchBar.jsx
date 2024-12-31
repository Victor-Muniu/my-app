import React from 'react';

function SearchBar({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  onAddItem 
}) {
  return (
    <div className="search-bar">
      <div className="search-input">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <select 
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option>All Categories</option>
        <option>Beach Accessories</option>
        <option>Home Decor</option>
      </select>
      <select>
        <option>All Stock Status</option>
        <option>In Stock</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>
      <button className="add-item-btn" onClick={onAddItem}>
        + Add Item
      </button>
    </div>
  );
}

export default SearchBar;
