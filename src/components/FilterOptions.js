import React from 'react';
import styles from '../styles/FilterOptions.module.css';

/**
 * Component for displaying and managing filter options for song search.
 * Allows users to filter songs by multiple criteria with dropdown selects.
 * Includes a "Clear All" button to reset all filters at once.
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.filters - Available filter options mapping filter names to possible values
 * @param {Object} props.selectedFilters - Currently selected filter values keyed by filter name
 * @param {Function} props.onFilterChange - Callback when a filter value changes
 * @returns {JSX.Element}
 */
const FilterOptions = ({ filters = {}, selectedFilters = {}, onFilterChange }) => {
  const handleFilterChange = (filterName, value) => {
    const singularName = filterName.endsWith('s') ? filterName.slice(0, -1) : filterName;
    onFilterChange(singularName, value);
  };

  const handleClearAll = () => {
    const filterNames = ['artist', 'album', 'year', 'genre'];
    filterNames.forEach(filter => {
      onFilterChange(filter, '');
    });
  };

  const filterConfigs = Object.entries(filters).map(([name, options]) => ({
    name,
    label: name.charAt(0).toUpperCase() + name.slice(1),
    options: Array.isArray(options) ? options
      .sort((a, b) => a.toString().localeCompare(b.toString(), undefined, { numeric: true }))
      .map(value => ({
        value,
        label: value
      })) : []
  }));

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterOptions}>
        {filterConfigs.map(filter => {
          const singularName = filter.name.endsWith('s') ? filter.name.slice(0, -1) : filter.name;
          const currentValue = selectedFilters[singularName] || '';
          
          return (
            <select
              key={filter.name}
              id={filter.name}
              className={styles.filterSelect}
              value={currentValue}
              onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            >
              <option value="" disabled>{`${filter.label}`}</option>
              {filter.options.length > 0 && filter.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        })}
        {Object.values(selectedFilters).some(value => value) && (
          <button 
            onClick={handleClearAll}
            title="Clear all filters"
            className={styles.clearButton}
            aria-label="Clear all filters"
          >
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterOptions;