import React from 'react';
import SongDetailInPlaylist from './SongDetailInPlaylist';
import '../styles/ScrollableList.css';

const Playlist = ({ playlist, onRemove }) => {
    return (
        <div>
            <h2>Your Playlist ({playlist.length} songs)</h2>
            <div className="scrollable-container">
                <ul className="scrollable-list">
                    {playlist.map((song, index) => (
                        <li key={`${song.title}-${song.artist}-${index}`} className="scrollable-list-item">
                            <SongDetailInPlaylist 
                                song={song}
                                onRemove={onRemove}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Playlist;