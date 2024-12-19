import { useState } from 'react';

/**
 * Custom hook for managing playlist operations
 * @returns {Object} Playlist state and methods
 */
export const usePlaylist = () => {
    const [playlist, setPlaylist] = useState([]);

    const handleAddToPlaylist = (song) => {
        const songToAdd = {
            title: song.title,
            artist: song.artist,
            album: song.album,
            albumCover: song.albumCover
        };

        setPlaylist(prevPlaylist => {
            // Check if song already exists in playlist
            const exists = prevPlaylist.some(item => 
                item.title === songToAdd.title && 
                item.artist === songToAdd.artist
            );

            if (!exists) {
                return [...prevPlaylist, songToAdd];
            }
            return prevPlaylist;
        });
    };

    const handleRemoveFromPlaylist = (song) => {
        setPlaylist(prevPlaylist => 
            prevPlaylist.filter(item => 
                item.title !== song.title || 
                item.artist !== song.artist || 
                item.album !== song.album
            )
        );
    };

    return {
        playlist,
        handleAddToPlaylist,
        handleRemoveFromPlaylist
    };
}; 