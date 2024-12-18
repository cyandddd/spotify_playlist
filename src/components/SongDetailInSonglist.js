import React from 'react';

const SongDetailInSonglist = ({ song, onAdd, inPlaylist}) => {
    return (
        <div>
            <h2>{song.title || 'Unknown Title'}</h2>
            <p>Artist: {song.artist || 'Unknown Artist'}</p>
            <p>Album: {song.album || 'Unknown Album'}</p>
            <button onClick={() => onAdd(song)} disabled={inPlaylist}>Add Song</button>
        </div>
    );
};
export default SongDetailInSonglist;