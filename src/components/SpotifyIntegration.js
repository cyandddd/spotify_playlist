import React from 'react';

/**
 * SpotifyIntegration Component
 * Handles Spotify authentication and playlist export functionality
 * 
 * @param {Function} onAuthenticate - Callback function called after successful authentication
 * @param {Function} onExport - Callback function to handle playlist export
 * @param {boolean} isAuthenticated - Flag indicating if user is authenticated with Spotify
 * @returns {JSX.Element} Spotify integration UI component
 */
const SpotifyIntegration = ({ onAuthenticate, onExport, isAuthenticated }) => {
    /**
     * Handles the Spotify authentication process
     * Makes API call to get access token and stores it in localStorage
     */
    const handleAuth = async () => {
        try {
            // Request authentication token from backend
            const response = await fetch('/auth/token');
            const data = await response.json();
            
            // If token received successfully, store it and notify parent
            if (data.access_token) {
                localStorage.setItem('spotify_token', data.access_token);
                onAuthenticate(data.access_token);
            }
        } catch (error) {
            console.error('Authentication error:', error);
        }
    };

    return (
        <div className="spotify-integration">
            {/* Conditionally render either Connect or Export button based on auth status */}
            {!isAuthenticated ? (
                <button onClick={handleAuth}>
                    Connect to Spotify
                </button>
            ) : (
                <button onClick={onExport}>
                    Export Playlist to Spotify
                </button>
            )}
        </div>
    );
};

export default SpotifyIntegration;