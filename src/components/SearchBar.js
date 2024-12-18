import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    const [album, setAlbum] = useState('');
    const [year, setYear] = useState('');

    const handleSearch = () => {
        onSearch({ title, artist, genre, album, year });
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search for a song..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Artist" 
                value={artist} 
                onChange={(e) => setArtist(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Genre" 
                value={genre} 
                onChange={(e) => setGenre(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Album" 
                value={album} 
                onChange={(e) => setAlbum(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Release Year" 
                value={year} 
                onChange={(e) => setYear(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;