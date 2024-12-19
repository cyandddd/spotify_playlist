import React from 'react';
import SongDetail from './SongDetailInSonglist';
import '../styles/ScrollableList.css';

const SongList = ({ songs, onAdd, playlist }) => {
    return (
        <div>
            <h2>Song List</h2>
            <div className="scrollable-container">
                <ul className="scrollable-list">
                    {songs.map((song, index) => (
                        <li key={index} className="scrollable-list-item">
                            <SongDetail 
                                song={{
                                    title: song.name,
                                    artist: song.artists[0]?.name,
                                    album: song.album.name,
                                    albumCover: song.album.images[0]?.url,
                                    id: song.id,
                                    uri: song.uri
                                }}
                                onAdd={onAdd}
                                inPlaylist={playlist.some(item => (
                                    item.title === song.name && 
                                    item.artist === song.artists[0]?.name && 
                                    item.album === song.album.name
                                ))}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SongList;