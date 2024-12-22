import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterOptions from './components/FilterOptions';
import SongList from './components/SongList';
import Playlist from './components/Playlist';
import SpotifyIntegration from './components/SpotifyIntegration';
import UserProfile from './components/UserProfile';
import LoginModal from './components/LoginModal';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';
import { usePlaylist } from './hooks/usePlaylist';
import { useSongSearch } from './hooks/useSongSearch';
import { exportPlaylistToSpotify } from './services/spotifyApiService';
import { handleClearFilters } from './utils/filters';
import { handleExport } from './services/spotifyExportService';
import './styles/Layout.css';

/**
 * Main application component that handles music search, playlist management,
 * and Spotify integration.
 * 
 * @component
 * @returns {JSX.Element} The rendered App component containing the full application UI
 */
function App() {
  // State for controlling login modal visibility
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  /**
   * Hook for handling Spotify authentication
   * @returns {Object} Authentication state and methods
   * @property {Object} user - The authenticated user's data
   * @property {string} token - Spotify access token
   * @property {boolean} isAuthenticated - Whether user is authenticated
   * @property {Function} handleLogout - Logout handler function
   */
  const {
    user,
    token,
    isAuthenticated, 
    handleLogout
  } = useSpotifyAuth();

  /**
   * Hook for managing playlist operations
   * @returns {Object} Playlist state and methods
   * @property {Array<Object>} playlist - Array of song objects in playlist
   * @property {Function} handleAddToPlaylist - Function to add song to playlist
   * @property {Function} handleRemoveFromPlaylist - Function to remove song from playlist
   * @property {Function} handleClearPlaylist - Function to clear entire playlist
   */
  const {
    playlist,
    handleAddToPlaylist,
    handleRemoveFromPlaylist,
    handleClearPlaylist
  } = usePlaylist();

  /**
   * Hook for managing song search and filtering
   * @param {Array<Object>} playlist - Current playlist for filtering
   * @returns {Object} Search/filter state and methods
   * @property {Array<Object>} filteredSongs - Filtered song results
   * @property {Object} filters - Available filter options
   * @property {Object} selectedFilters - Currently selected filters
   * @property {number} total - Total number of results
   * @property {Function} handleSearch - Search handler function
   * @property {Function} handleFilterChange - Filter change handler
   * @property {Function} handleLoadMore - Load more results handler
   */
  const {
    filteredSongs,
    filters,
    selectedFilters,
    total,
    handleSearch,
    handleFilterChange,
    handleLoadMore
  } = useSongSearch(playlist);

  return (
    <div className="App">
      <header className="header">
        <SearchBar 
          onSearch={handleSearch}
          clearFilters={() => handleClearFilters(selectedFilters, handleFilterChange)}
        />
        <div className="filter-options">
          <FilterOptions
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <UserProfile 
          user={user}
          onLogin={() => setShowLoginModal(true)}
          onLogout={handleLogout}
        />
      </header>
      
      <main className="main-content">
        <div className="content-wrapper">
          <SongList 
            songs={filteredSongs} 
            onAdd={handleAddToPlaylist} 
            playlist={playlist}
            total={total}
            onLoadMore={handleLoadMore}
          />
          <Playlist 
            playlist={playlist} 
            onRemove={handleRemoveFromPlaylist} 
          />
        </div>
        
        <SpotifyIntegration 
          onExport={() => handleExport({ isAuthenticated, user, playlist, token, exportPlaylistToSpotify })}
          isAuthenticated={isAuthenticated}
          onAuthenticate={() => setShowLoginModal(true)}
          onClearPlaylist={handleClearPlaylist}
        />
      </main>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}

export default App;
