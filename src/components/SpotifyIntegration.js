import React from 'react';

/**
 * SpotifyIntegration Component
 * Handles Spotify authentication and playlist export functionality
 * 
 * @param {Function} onAuthenticate - Callback function called after successful authentication
 * @param {Function} onExport - Callback function to handle playlist export
 * @param {Function} onClearPlaylist - Callback function to clear the playlist
 * @param {boolean} isAuthenticated - Flag indicating if user is authenticated with Spotify
 * @returns {JSX.Element} Spotify integration UI component
 */
const SpotifyIntegration = ({ onAuthenticate, onExport, onClearPlaylist, isAuthenticated }) => {
    return (
        <div className="spotify-integration">
            <div className="button-group">
                <button 
                    className={`exportButton ${!isAuthenticated ? 'loggedOut' : ''}`}
                    onClick={isAuthenticated ? onExport : onAuthenticate}
                >
                    {isAuthenticated ? 'Export Playlist to Spotify' : 'Connect to Spotify'}
                </button>
                <button 
                    className="exportButton clearButton"
                    onClick={onClearPlaylist}
                >
                    Clear Playlist
                </button>
            </div>
        </div>
    );
};

export default SpotifyIntegration;