import React from 'react';

const SpotifyIntegration = ({ onAuthenticate, onExport }) => {
    return (
        <div>
            <button onClick={onAuthenticate}>Authenticate with Spotify</button>
            <button onClick={onExport}>Export Playlist to Spotify</button>
        </div>
    );
};

export default SpotifyIntegration;