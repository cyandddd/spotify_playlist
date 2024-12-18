import React from 'react';
import SongDetail from './SongDetailInPlaylist';

const Playlist = ({ playlist, onRemove }) => {
    return (
        <div>
            <h2>Your Playlist</h2>
            <ul>
                {playlist.map((song, index) => (
                    <li key={index}>
                        <SongDetail song={song} onRemove={onRemove} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;