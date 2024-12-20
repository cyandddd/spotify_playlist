import React, { useEffect, useRef, useCallback } from 'react';
import SongDetail from './SongDetailInSonglist';
import '../styles/ScrollableList.css';

const SongList = ({ songs, onAdd, playlist, total, onLoadMore }) => {
    const listRef = useRef(null);

    const handleScroll = useCallback((e) => {
        const element = e.target;
        if (element.scrollHeight - element.scrollTop <= element.clientHeight + 1) {
            // User has scrolled to bottom
            onLoadMore && onLoadMore();
        }
    }, [onLoadMore]);

    useEffect(() => {
        const listElement = listRef.current;
        if (listElement) {
            listElement.addEventListener('scroll', handleScroll);
            return () => listElement.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    return (
        <div>
            <h2>Song List {total > 0 && `(${songs.length} of ${total})`}</h2>
            <div className="scrollable-container" ref={listRef}>
                <ul className="scrollable-list">
                    {songs.map((song, index) => (
                        <li key={`${song.id}-${index}`} className="scrollable-list-item">
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