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
import './styles/Layout.css';

/**
 * Main application component that handles music search, playlist management,
 * and Spotify integration.
 * 
 * @component
 * @returns {JSX.Element} The rendered App component
 */
function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const {
    user,
    token,
    isAuthenticated,
    handleLogout
  } = useSpotifyAuth();

  const {
    playlist,
    handleAddToPlaylist,
    handleRemoveFromPlaylist,
    handleClearPlaylist
  } = usePlaylist();

  const {
    filteredSongs,
    filters,
    selectedFilters,
    total,
    handleSearch,
    handleFilterChange,
    handleLoadMore
  } = useSongSearch(playlist);

  /**
   * Clears all selected filters
   */
  const handleClearFilters = () => {
    // Clear each filter by setting it to empty string
    Object.keys(selectedFilters).forEach(filter => {
      handleFilterChange(filter, '');
    });
  };

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
        <SearchBar 
          onSearch={handleSearch}
          clearFilters={handleClearFilters}
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
          onExport={handleExport}
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
