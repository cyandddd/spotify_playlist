import React from 'react';

const SongDetailInPlaylist = ({ song, onRemove }) => {
    return (
        <div className="song-detail">
            {song.albumCover && (
                <img 
                    src={song.albumCover} 
                    alt={`${song.album} cover`}
                    className="album-cover"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
            )}
            <div className="song-info">
                <h2>{song.title || 'Unknown Title'}</h2>
                <p>Artist: {song.artist || 'Unknown Artist'}</p>
                <p>Album: {song.album || 'Unknown Album'}</p>
                <button onClick={() => onRemove(song)}>Remove Song</button>
            </div>
        </div>
    );
};

export default SongDetailInPlaylist;