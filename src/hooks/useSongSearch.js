import { useState, useEffect } from 'react';
import { searchTracks } from '../utils/spotifyService';

/**
 * Custom hook for managing song search and filtering
 * @returns {Object} Search state and methods
 */
export const useSongSearch = () => {
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [filters, setFilters] = useState({
        artists: [],
        albums: [],
        years: []
    });
    const [selectedFilters, setSelectedFilters] = useState({
        artist: '',
        album: '',
        year: ''
    });

    const handleSearch = async (searchQuery) => {
        const results = await searchTracks(searchQuery);
        const songsWithCovers = results.map(song => ({
            name: song.name,
            artists: song.artists,
            album: song.album,
            albumCover: song.album.images[0]?.url,
            releaseDate: song.album.release_date
        }));
        
        setSongs(songsWithCovers);
        
        // Extract unique filter values
        const uniqueFilters = {
            artists: [...new Set(songsWithCovers.map(song => song.artists[0]?.name).filter(Boolean))],
            albums: [...new Set(songsWithCovers.map(song => song.album.name))],
            years: [...new Set(songsWithCovers.map(song => song.releaseDate?.split('-')[0]).filter(Boolean))]
        };
        
        setFilters(uniqueFilters);
        setFilteredSongs(songsWithCovers);
    };

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    // Apply filters whenever songs or selectedFilters change
    useEffect(() => {
        let filtered = songs;
        
        if (selectedFilters.artist) {
            filtered = filtered.filter(song => 
                song.artists.some(artist => artist.name === selectedFilters.artist)
            );
        }
        
        if (selectedFilters.album) {
            filtered = filtered.filter(song => 
                song.album.name === selectedFilters.album
            );
        }
        
        if (selectedFilters.year) {
            filtered = filtered.filter(song => 
                song.releaseDate?.startsWith(selectedFilters.year)
            );
        }
        
        setFilteredSongs(filtered);
    }, [songs, selectedFilters]);

    return {
        songs,
        filteredSongs,
        filters,
        selectedFilters,
        handleSearch,
        handleFilterChange
    };
}; 