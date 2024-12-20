import { useState, useEffect } from 'react';

const PLAYLIST_STORAGE_KEY = 'jamming_playlist';

/**
 * Custom hook for managing playlist operations with persistence
 * @returns {Object} Playlist state and methods
 */
export const usePlaylist = () => {
    const [playlist, setPlaylist] = useState(() => {
        // Initialize from localStorage if available
        const savedPlaylist = localStorage.getItem(PLAYLIST_STORAGE_KEY);
        return savedPlaylist ? JSON.parse(savedPlaylist) : [];
    });

    // Save to localStorage whenever playlist changes
    useEffect(() => {
        localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify(playlist));
    }, [playlist]);

    const handleAddToPlaylist = (song) => {
        if (!playlist.some(item => item.id === song.id)) {
            const songToAdd = {
                id: song.id,
                title: song.title,
                artist: song.artist,
                album: song.album,
                albumCover: song.albumCover,
                uri: song.uri
            };
            setPlaylist(prevPlaylist => [...prevPlaylist, songToAdd]);
        }
    };

    const handleRemoveFromPlaylist = (songId) => {
        setPlaylist(prevPlaylist => 
            prevPlaylist.filter(song => song.id !== songId)
        );
    };

    const handleClearPlaylist = () => {
        if (window.confirm('Are you sure you want to clear the entire playlist? This cannot be undone.')) {
            setPlaylist([]);
            localStorage.setItem(PLAYLIST_STORAGE_KEY, '[]');
        }
    };

    return {
        playlist,
        handleAddToPlaylist,
        handleRemoveFromPlaylist,
        handleClearPlaylist
    };
}; 