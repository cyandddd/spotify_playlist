import React from 'react';

const SongDetailInPlaylist = ({ song, onRemove }) => {
    return (
        <div>
            <h2>{song.title || 'Unknown Title'}</h2>
            <p>Artist: {song.artist || 'Unknown Artist'}</p>
            <p>Album: {song.album || 'Unknown Album'}</p>
            <button onClick={() => onRemove(song)}>Remove Song</button>
        </div>
    );
};
export default SongDetailInPlaylist;