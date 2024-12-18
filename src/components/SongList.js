import React, { useState } from 'react';
import SongDetail from './SongDetailInSonglist';

const SongList = ({ songs, onAdd, playlist }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    
    // Calculate start and end indices for current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Get current page items
    const currentItems = songs.slice(startIndex, endIndex);
    
    // Calculate total pages
    const totalPages = Math.ceil(songs.length / itemsPerPage);
    
    // Calculate if there are previous/next pages
    const hasPreviousPage = currentPage > 0;
    const hasNextPage = endIndex < songs.length;
    
    // Handle page navigation
    const handleNextPage = () => {
        if (hasNextPage) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    const handlePrevPage = () => {
        if (hasPreviousPage) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h2>Song List</h2>
            <ul>
                {currentItems.map((song, index) => (
                    <li key={startIndex + index}>
                        <SongDetail 
                            song={{
                                title: song.name,
                                artist: song.artists[0]?.name,
                                album: song.album.name
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
            {songs.length > 0 && (
                <div className="pagination-controls">
                    <button 
                        onClick={handlePrevPage} 
                        disabled={!hasPreviousPage}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage + 1}/{totalPages}</span>
                    <button 
                        onClick={handleNextPage} 
                        disabled={!hasNextPage}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default SongList;