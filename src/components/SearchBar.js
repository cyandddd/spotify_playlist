import React, { useState } from 'react';
import FilterOptions from './FilterOptions';

const SearchBar = ({ onSearch, filters, selectedFilters, onFilterChange }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-section">
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search for songs..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <FilterOptions 
                filters={filters}
                selectedFilters={selectedFilters}
                onFilterChange={onFilterChange}
            />
        </div>
    );
};

export default SearchBar;