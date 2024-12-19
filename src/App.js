import React from 'react';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import Playlist from './components/Playlist';
import SpotifyIntegration from './components/SpotifyIntegration';
import UserProfile from './components/UserProfile';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';
import { usePlaylist } from './hooks/usePlaylist';
import { useSongSearch } from './hooks/useSongSearch';
import { exportPlaylistToSpotify } from './services/spotifyApiService';
import './styles/Layout.css';

/**
 * Main application component that handles music search, playlist management,
 * and Spotify integration.
 * 
 * @component
 * @returns {JSX.Element} The rendered App component
 */
function App() {
  const {
    user,
    token,
    isAuthenticated,
    handleLogin,
    handleLogout
  } = useSpotifyAuth();

  const {
    playlist,
    handleAddToPlaylist,
    handleRemoveFromPlaylist
  } = usePlaylist();

  const {
    songs,
    filteredSongs,
    filters,
    selectedFilters,
    handleSearch,
    handleFilterChange
  } = useSongSearch(playlist);

  /**
   * Handles the export of the current playlist to Spotify
   */
  const handleExport = async () => {
    if (!isAuthenticated || !user || playlist.length === 0) {
      alert('Please log in and add songs to your playlist before exporting');
      return;
    }

    const playlistName = prompt('Enter a name for your playlist:', 
      `My Playlist ${new Date().toLocaleDateString()}`);
    
    if (!playlistName) return;

    try {
      await exportPlaylistToSpotify({
        token,
        user,
        playlist,
        playlistName
      });
      alert(`Playlist "${playlistName}" successfully exported to Spotify!`);
    } catch (error) {
      console.error('Export error:', error);
      alert(`Failed to export playlist: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <UserProfile 
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </header>
      
      <main className="main-content">
        <SearchBar 
          onSearch={handleSearch}
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
        
        <div className="content-wrapper">
          <SongList 
            songs={filteredSongs} 
            onAdd={handleAddToPlaylist} 
            playlist={playlist}
          />
          <Playlist 
            playlist={playlist} 
            onRemove={handleRemoveFromPlaylist} 
          />
        </div>
        
        <SpotifyIntegration 
          onExport={handleExport}
          isAuthenticated={isAuthenticated}
          onAuthenticate={handleLogin}
        />
      </main>
    </div>
  );
}

export default App;
