import React, { useState, useEffect } from 'react';
import SongDetailInPlaylist from './SongDetailInPlaylist';

const Playlist = ({ playlist, onRemove }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    
    // Reset to first page when playlist length changes
    useEffect(() => {
        if (currentPage > Math.ceil(playlist.length / itemsPerPage) - 1) {
            setCurrentPage(0);
        }
    }, [playlist.length, currentPage, itemsPerPage]);
    
    // Calculate pagination values
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = playlist.slice(startIndex, endIndex);
    const totalPages = Math.ceil(playlist.length / itemsPerPage);
    
    // Navigation checks
    const hasPreviousPage = currentPage > 0;
    const hasNextPage = currentPage < totalPages - 1;
    
    const handleNextPage = () => {
        if (hasNextPage) {
            setCurrentPage(prev => prev + 1);
        }
    };
    
    const handlePrevPage = () => {
        if (hasPreviousPage) {
            setCurrentPage(prev => prev - 1);
        }
    };

    // Add debugging logs
    console.log('Playlist length:', playlist.length);
    console.log('Current page:', currentPage);
    console.log('Total pages:', totalPages);
    console.log('Current items:', currentItems);

    return (
        <div>
            <h2>Your Playlist ({playlist.length} songs)</h2>
            <ul>
                {currentItems.map((song, index) => (
                    <li key={`${song.title}-${song.artist}-${startIndex + index}`}>
                        <SongDetailInPlaylist 
                            song={song}
                            onRemove={onRemove}
                        />
                    </li>
                ))}
            </ul>
            {playlist.length > itemsPerPage && (
                <div className="pagination-controls">
                    <button 
                        onClick={handlePrevPage} 
                        disabled={!hasPreviousPage}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage + 1} of {totalPages}</span>
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

export default Playlist;