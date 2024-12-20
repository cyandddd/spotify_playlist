import { useState, useEffect } from 'react';
import { searchTracks } from '../services/spotifyApiService';

/**
 * Custom hook for managing song search and filtering
 * @param {Array} currentPlaylist - The current playlist from the parent component
 * @returns {Object} Search state and methods
 */
export const useSongSearch = (currentPlaylist = []) => {
    const [songs, setSongs] = useState(() => {
        const savedSongs = localStorage.getItem('jamming_songs');
        return savedSongs ? JSON.parse(savedSongs) : [];
    });

    const [filteredSongs, setFilteredSongs] = useState(() => {
        const savedFilteredSongs = localStorage.getItem('jamming_filtered_songs');
        return savedFilteredSongs ? JSON.parse(savedFilteredSongs) : [];
    });

    const [filters, setFilters] = useState(() => {
        const savedFilters = localStorage.getItem('jamming_filters');
        const defaultFilters = {
            artists: [],
            albums: [],
            years: [],
            genres: []
        };
        return savedFilters ? JSON.parse(savedFilters) : defaultFilters;
    });

    const [selectedFilters, setSelectedFilters] = useState(() => {
        const savedSelectedFilters = localStorage.getItem('jamming_selected_filters');
        const defaultSelectedFilters = {
            artist: '',
            album: '',
            year: '',
            genre: ''
        };
        return savedSelectedFilters ? JSON.parse(savedSelectedFilters) : defaultSelectedFilters;
    });

    const [total, setTotal] = useState(0);
    const [nextUrl, setNextUrl] = useState(null);
    const [currentSearchQuery, setCurrentSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Persist songs and filters to localStorage
    useEffect(() => {
        localStorage.setItem('jamming_songs', JSON.stringify(songs));
    }, [songs]);

    useEffect(() => {
        localStorage.setItem('jamming_filtered_songs', JSON.stringify(filteredSongs));
    }, [filteredSongs]);

    useEffect(() => {
        localStorage.setItem('jamming_filters', JSON.stringify(filters));
    }, [filters]);

    useEffect(() => {
        localStorage.setItem('jamming_selected_filters', JSON.stringify(selectedFilters));
    }, [selectedFilters]);

    const handleSearch = async (searchQuery) => {
        setIsLoading(true);
        setCurrentSearchQuery(searchQuery);
        try {
            const results = await searchTracks(searchQuery);
            console.log('Raw search results:', results);
            
            const songsWithCovers = results.tracks.map(song => ({
                name: song.name,
                artists: song.artists,
                album: song.album,
                albumCover: song.album.images[0]?.url,
                releaseDate: song.album.release_date,
                id: song.id,
                genres: song.genres || []
            }));
            
            setSongs(songsWithCovers);
            setTotal(results.total);
            setNextUrl(results.next);
            
            // Extract unique filter values
            const uniqueFilters = {
                artists: [...new Set(songsWithCovers.map(song => song.artists[0]?.name).filter(Boolean))],
                albums: [...new Set(songsWithCovers.map(song => song.album.name))],
                years: [...new Set(songsWithCovers.map(song => song.releaseDate?.split('-')[0]).filter(Boolean))],
                genres: [...new Set(songsWithCovers.flatMap(song => song.genres))]
            };
            
            setFilters(uniqueFilters);
            setFilteredSongs(songsWithCovers);
        } catch (error) {
            console.error('Error searching tracks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = async () => {
        if (!nextUrl || isLoading) return;
        
        setIsLoading(true);
        try {
            const results = await searchTracks(currentSearchQuery, nextUrl);
            
            const newSongsWithCovers = results.tracks.map(song => ({
                name: song.name,
                artists: song.artists,
                album: song.album,
                albumCover: song.album.images[0]?.url,
                releaseDate: song.album.release_date,
                id: song.id,
                genres: song.genres || []
            }));
            
            setSongs(prevSongs => [...prevSongs, ...newSongsWithCovers]);
            setNextUrl(results.next);
            
            // Update filters with new songs
            const allSongs = [...songs, ...newSongsWithCovers];
            const uniqueFilters = {
                artists: [...new Set(allSongs.map(song => song.artists[0]?.name).filter(Boolean))],
                albums: [...new Set(allSongs.map(song => song.album.name))],
                years: [...new Set(allSongs.map(song => song.releaseDate?.split('-')[0]).filter(Boolean))],
                genres: [...new Set(allSongs.flatMap(song => song.genres))]
            };
            
            setFilters(uniqueFilters);
        } catch (error) {
            console.error('Error loading more tracks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (filterType, value) => {
        console.log('Filter changed:', filterType, value);
        const filterKey = filterType.endsWith('s') ? filterType.slice(0, -1) : filterType;
        setSelectedFilters(prev => ({
            ...prev,
            [filterKey]: value
        }));
    };

    // Function to reorder songs based on playlist
    const reorderSongsBasedOnPlaylist = (songsToReorder, playlist) => {
        // Create a map for quick lookup of songs in playlist
        const playlistMap = new Map(playlist.map(item => [
            `${item.title}-${item.artist}-${item.album}`,
            true
        ]));

        // Separate songs into two arrays: those in playlist and those not in playlist
        const [inPlaylist, notInPlaylist] = songsToReorder.reduce(
            ([inP, notInP], song) => {
                const key = `${song.name}-${song.artists[0]?.name}-${song.album.name}`;
                if (playlistMap.has(key)) {
                    inP.push(song);
                } else {
                    notInP.push(song);
                }
                return [inP, notInP];
            },
            [[], []]
        );

        // Return concatenated array with playlist songs at the end
        return [...notInPlaylist, ...inPlaylist];
    };

    // Apply filters and reordering whenever songs, selectedFilters, or playlist changes
    useEffect(() => {
        let filtered = songs;
        
        if (selectedFilters.artist) {
            filtered = filtered.filter(song => 
                song.artists.some(artist => 
                    artist.name.toLowerCase() === selectedFilters.artist.toLowerCase()
                )
            );
        }
        
        if (selectedFilters.album) {
            filtered = filtered.filter(song => 
                song.album.name.toLowerCase() === selectedFilters.album.toLowerCase()
            );
        }
        
        if (selectedFilters.year) {
            filtered = filtered.filter(song => 
                song.releaseDate?.startsWith(selectedFilters.year)
            );
        }
        
        if (selectedFilters.genre) {
            filtered = filtered.filter(song => 
                song.genres.some(genre => 
                    genre.toLowerCase() === selectedFilters.genre.toLowerCase()
                )
            );
        }
        
        // Reorder the filtered songs using the current playlist from props
        const reorderedSongs = reorderSongsBasedOnPlaylist(filtered, currentPlaylist);
        setFilteredSongs(reorderedSongs);
    }, [songs, selectedFilters, currentPlaylist]);

    return {
        songs: filteredSongs,
        filteredSongs,
        filters,
        selectedFilters,
        total,
        isLoading,
        handleSearch,
        handleFilterChange,
        handleLoadMore
    };
}; 