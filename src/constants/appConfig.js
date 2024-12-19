/**
 * Application-wide configuration constants
 */

export const APP_CONFIG = {
  // API Configuration
  API: {
    BASE_URL: process.env.REACT_APP_API_URL || 'https://api.spotify.com/v1',
    TIMEOUT: 10000, // 10 seconds
  },

  // Playlist Configuration
  PLAYLIST: {
    MAX_SONGS: 100,
    DEFAULT_NAME: 'My Jamming Playlist',
  },

  // Search Configuration
  SEARCH: {
    MIN_QUERY_LENGTH: 2,
    DEBOUNCE_TIME: 300, // milliseconds
    MAX_RESULTS: 50,
  },

  // UI Configuration
  UI: {
    ANIMATION_DURATION: 200,
    TOAST_DURATION: 3000,
    MOBILE_BREAKPOINT: 768,
  },
};

/**
 * Error messages used throughout the application
 */
export const ERROR_MESSAGES = {
  AUTHENTICATION: {
    NOT_LOGGED_IN: 'Please log in to perform this action',
    SESSION_EXPIRED: 'Your session has expired. Please log in again',
  },
  PLAYLIST: {
    FULL: 'Playlist has reached maximum capacity',
    EMPTY_EXPORT: 'Cannot export an empty playlist',
  },
  SEARCH: {
    TOO_SHORT: 'Search query must be at least 2 characters',
    NO_RESULTS: 'No results found',
  },
}; 