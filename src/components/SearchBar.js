import React, { useState } from 'react';
import { APP_CONFIG, ERROR_MESSAGES } from '../constants/appConfig';
import styles from '../styles/SearchBar.module.css';

// SearchBar component handles song search on form submission
function SearchBar({ onSearch, clearFilters }) {
  // Track search input value
  const [searchTerm, setSearchTerm] = useState('');

  // Handle input changes
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.length >= APP_CONFIG.SEARCH.MIN_QUERY_LENGTH) {
      clearFilters?.(); // Clear filters before performing search
      onSearch(searchTerm);
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for songs..."
            aria-label="Search for songs"
          />
          <button type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
      </div>

      {/* Show error if search term is too short */}
      {searchTerm.length > 0 && searchTerm.length < APP_CONFIG.SEARCH.MIN_QUERY_LENGTH && (
        <p className={styles.errorMessage}>{ERROR_MESSAGES.SEARCH.TOO_SHORT}</p>
      )}
    </div>
  );
}

export default SearchBar;