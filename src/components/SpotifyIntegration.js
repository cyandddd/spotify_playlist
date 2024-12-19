import React from 'react';

const SpotifyIntegration = ({ onAuthenticate, onExport, isAuthenticated }) => {
    const handleAuth = async () => {
        try {
            const response = await fetch('/auth/token');
            const data = await response.json();
            
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