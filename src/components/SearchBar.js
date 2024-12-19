import React, { useState } from 'react';
import FilterOptions from './FilterOptions';
import { APP_CONFIG, ERROR_MESSAGES } from '../constants/appConfig';
import useDebounce from '../hooks/useDebounce';

// SearchBar component handles song search with filters and debounced input
function SearchBar({ onSearch, filters = {}, selectedFilters = {}, onFilterChange }) {
  // Track search input value
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search to avoid too many API calls
  const debouncedSearch = useDebounce((value) => {
    if (value.length >= APP_CONFIG.SEARCH.MIN_QUERY_LENGTH) {
      onSearch(value);
    }
  }, APP_CONFIG.SEARCH.DEBOUNCE_TIME);

  // Handle input changes and trigger debounced search
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.length >= APP_CONFIG.SEARCH.MIN_QUERY_LENGTH) {
      onSearch(searchTerm);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for songs..."
          aria-label="Search for songs"
        />
        <button type="submit">
          Search
        </button>
      </form>

      {/* Show error if search term is too short */}
      {searchTerm.length > 0 && searchTerm.length < APP_CONFIG.SEARCH.MIN_QUERY_LENGTH && (
        <p>{ERROR_MESSAGES.SEARCH.TOO_SHORT}</p>
      )}

      {/* Render filter options */}
      <FilterOptions
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}

export default SearchBar;