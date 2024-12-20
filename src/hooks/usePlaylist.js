import { useState, useEffect } from 'react';

/**
 * Custom hook for managing playlist operations
 * @returns {Object} Playlist state and methods
 */
export const usePlaylist = () => {
    const [playlist, setPlaylist] = useState(() => {
        // Initialize from localStorage if available
        const savedPlaylist = localStorage.getItem('jamming_playlist');
        return savedPlaylist ? JSON.parse(savedPlaylist) : [];
    });

    // Save to localStorage whenever playlist changes
    useEffect(() => {
        localStorage.setItem('jamming_playlist', JSON.stringify(playlist));
    }, [playlist]);

    const handleAddToPlaylist = (song) => {
        const songToAdd = {
            title: song.title,
            artist: song.artist,
            album: song.album,
            albumCover: song.albumCover,
            id: song.id
        };
        
        setPlaylist(prevPlaylist => {
            // Check if song already exists in playlist
            const exists = prevPlaylist.some(item => 
                item.title === songToAdd.title && 
                item.artist === songToAdd.artist &&
                item.album === songToAdd.album
            );

            if (!exists) {
                const newPlaylist = [...prevPlaylist, songToAdd];
                console.log('Updated playlist:', newPlaylist);
                return newPlaylist;
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