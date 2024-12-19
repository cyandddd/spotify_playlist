import React from 'react';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import Playlist from './components/Playlist';
import SpotifyIntegration from './components/SpotifyIntegration';
import UserProfile from './components/UserProfile';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';
import { usePlaylist } from './hooks/usePlaylist';
import { useSongSearch } from './hooks/useSongSearch';
import { SPOTIFY_ENDPOINTS } from './constants/spotifyConstants';

/**
 * Main application component that handles music search, playlist management,
 * and Spotify integration.
 * 
 * @component
 * @returns {JSX.Element} The rendered App component
 */
function App() {
  // Custom hooks for different functionalities
  const {
    user,
    token,
    isAuthenticated,
    handleLogin,
    handleLogout,
    fetchUserProfile
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
  } = useSongSearch();

  /**
   * Handles Spotify authentication and export functionality
   * @todo Implement export functionality
   */
  const handleExport = () => {
    // Implement export logic here
    console.log('Export functionality to be implemented');
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
        
        {isAuthenticated && (
          <SpotifyIntegration 
            onExport={handleExport} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
