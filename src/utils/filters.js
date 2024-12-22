// Utility function to clear all selected search/filter options
// This function is used to reset the filters in the application
/**
 * Clears all selected search/filter options.
 * 
 * @param {Object} selectedFilters - An object representing the currently selected filters.
 * @param {Function} handleFilterChange - A function to update the filter state.
 * @returns {void}
 */
export const handleClearFilters = (selectedFilters, handleFilterChange) => {
  // Clear each filter by setting it to an empty string
  Object.keys(selectedFilters).forEach(filter => {
    handleFilterChange(filter, '');
  });
}; 