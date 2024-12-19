import React from 'react';

const FilterOptions = ({ filters, selectedFilters, onFilterChange }) => {
    const { artists, albums, years } = filters;

    return (
        <div className="filter-options">
            <select 
                value={selectedFilters.artist || ''} 
                onChange={(e) => onFilterChange('artist', e.target.value)}
            >
                <option value="">All Artists</option>
                {artists.map(artist => (
                    <option key={artist} value={artist}>{artist}</option>
                ))}
            </select>

            <select 
                value={selectedFilters.album || ''} 
                onChange={(e) => onFilterChange('album', e.target.value)}
            >
                <option value="">All Albums</option>
                {albums.map(album => (
                    <option key={album} value={album}>{album}</option>
                ))}
            </select>

            <select 
                value={selectedFilters.year || ''} 
                onChange={(e) => onFilterChange('year', e.target.value)}
            >
                <option value="">All Years</option>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
};

export default FilterOptions; 