import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import SongDetail from './components/SongDetailInSonglist';
import Playlist from './components/Playlist';
import SpotifyIntegration from './components/SpotifyIntegration';
import { searchTracks } from './utils/spotifyService';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  const handleSearch = async (searchParams) => {
    const results = await searchTracks(searchParams.title);
    setSongs(results);
  };

  const handleAddToPlaylist = (song) => {
    setPlaylist([...playlist, song]);
  };

  const handleRemoveFromPlaylist = (song) => {
    setPlaylist(playlist.filter(item => item !== song));
  };

  const handleAuthenticate = () => {
    // Implement Spotify authentication logic here
  };

  const handleExport = () => {
    // Implement export logic here
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <SongList songs={songs} onAdd={handleAddToPlaylist} playlist={playlist}/>
      {selectedSong && <SongDetail song={selectedSong} />}
      <Playlist playlist={playlist} onRemove={handleRemoveFromPlaylist} />
      <SpotifyIntegration onAuthenticate={handleAuthenticate} onExport={handleExport} />
    </div>
  );
}

export default App;
