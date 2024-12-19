/**
 * Utility functions for formatting data
 */

/**
 * Formats a duration in milliseconds to a readable string (mm:ss)
 * @param {number} ms - Duration in milliseconds
 * @returns {string} Formatted duration string
 */
export const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
};

/**
 * Formats an artist array into a readable string
 * @param {Array<Object>} artists - Array of artist objects
 * @returns {string} Comma-separated list of artist names
 */
export const formatArtists = (artists) => {
  return artists.map(artist => artist.name).join(', ');
};

/**
 * Formats a date string to a localized date
 * @param {string} dateString - ISO date string
 * @returns {string} Localized date string
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
}; 