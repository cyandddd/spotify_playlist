// Service function to handle exporting the current playlist to Spotify
// This function interacts with the Spotify API to export playlists
/**
 * Exports the current playlist to Spotify.
 * 
 * @param {Object} params - The parameters for exporting the playlist.
 * @param {boolean} params.isAuthenticated - Whether the user is authenticated.
 * @param {Object} params.user - The authenticated user's data.
 * @param {Array<Object>} params.playlist - Array of song objects in the playlist.
 * @param {string} params.token - Spotify access token.
 * @param {Function} params.exportPlaylistToSpotify - Function to call the Spotify API for exporting the playlist.
 * @returns {Promise<void>} - A promise that resolves when the export is complete.
 * @throws {Error} If the export fails.
 */
export const handleExport = async ({ isAuthenticated, user, playlist, token, exportPlaylistToSpotify }) => {
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