/**
 * Spotify API endpoints
 */
export const SPOTIFY_ENDPOINTS = {
    ME: 'https://api.spotify.com/v1/me',
    SEARCH: 'https://api.spotify.com/v1/search',
    CREATE_PLAYLIST: 'https://api.spotify.com/v1/users/{user_id}/playlists',
    ADD_TRACKS: 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
};

/**
 * Spotify authentication scopes
 */
export const SPOTIFY_SCOPES = [
    'playlist-modify-public',
    'playlist-modify-private',
    'user-read-private',
    'user-read-email'
].join(' ');

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'spotify_access_token',
    REFRESH_TOKEN: 'spotify_refresh_token',
    TOKEN_TIMESTAMP: 'spotify_token_timestamp'
}; 