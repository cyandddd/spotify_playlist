import { useCallback } from 'react';

/**
 * A custom hook that returns a debounced version of a callback function
 * @param {Function} callback - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
export const useDebounce = (callback, delay) => {
  return useCallback(
    (() => {
      let timeoutId = null;
      return (value) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          callback(value);
        }, delay);
      };
    })(),
    [callback, delay]
  );
};

export default useDebounce; 