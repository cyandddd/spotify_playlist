import React from 'react';

/**
 * Component for displaying and managing filter options for song search.
 * Allows users to filter songs by multiple criteria with dropdown selects.
 * Includes a "Clear All" button to reset all filters at once.
 * 
 * Filter logic:
 * - Each filter is rendered as a dropdown select
 * - Options are generated from the provided filters prop
 * - Selected values are tracked in selectedFilters state
 * - Changes trigger the onFilterChange callback
 * - Clear All resets all filters to empty state
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.filters - Available filter options mapping filter names to possible values
 * @param {Object} props.selectedFilters - Currently selected filter values keyed by filter name
 * @param {Function} props.onFilterChange - Callback when a filter value changes
 * @returns {JSX.Element}
 */
const FilterOptions = ({ filters = {}, selectedFilters = {}, onFilterChange }) => {
  // Handler for individual filter changes - updates parent state via callback
  const handleFilterChange = (filterName, value) => {
    onFilterChange(filterName, value);
  };

  // Reset all filters to empty state
  const handleClearAll = () => {
    Object.keys(selectedFilters).forEach(filter => {
      onFilterChange(filter, '');
    });
  };

  // Transform raw filter data into structured config with labels
  const filterConfigs = Object.entries(filters).map(([name, options]) => ({
    name,
    label: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
    options: Array.isArray(options) ? options.map(value => ({
      value,
      label: value // Use value as display label
    })) : []
  }));

  return (
    <div>
      {/* Header with conditional Clear All button */}
      <div>
        <h3>Filters</h3>
        {/* Show Clear All only when filters are active */}
        {Object.values(selectedFilters).some(value => value) && (
          <button 
            onClick={handleClearAll}
            title="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* Filter dropdowns */}
      <div>
        {filterConfigs.map(filter => (
          <div key={filter.name}>
            <label htmlFor={filter.name}>{filter.label}</label>
            <select
              id={filter.name}
              value={selectedFilters[filter.name] || ''} // Default to empty if no selection
              onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            >
              <option value="">All</option> {/* Default option */}
              {filter.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterOptions;