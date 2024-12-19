/**
 * Service for handling Spotify API interactions
 */

import { SPOTIFY_ENDPOINTS } from '../constants/spotifyConstants';

let accessToken;

export const authenticateSpotify = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&client_secret=${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`,
    });
    const data = await response.json();
    accessToken = data.access_token;
};

const getArtistGenres = async (artistId) => {
    if (!accessToken) {
        await authenticateSpotify();
    }
    try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return data.genres || [];
    } catch (error) {
        console.error('Error fetching artist genres:', error);
        return [];
    }
};

export const searchTracks = async (title) => {
    if (!accessToken) {
        await authenticateSpotify();
    }
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(title)}&type=track&limit=10`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();

    if (data.tracks && data.tracks.items) {
        const tracksWithGenres = await Promise.all(data.tracks.items.map(async track => {
            const genres = track.artists[0] ? await getArtistGenres(track.artists[0].id) : [];
            return {
                id: track.id,
                name: track.name,
                artists: track.artists,
                album: track.album,
                uri: track.uri,
                genres: genres
            };
        }));
        return tracksWithGenres;
    }
    return [];
};

/**
 * Creates a new playlist on Spotify and adds tracks to it
 */
export const exportPlaylistToSpotify = async ({ token, user, playlist, playlistName }) => {
    if (!token || !user || playlist.length === 0) {
        throw new Error('Missing required parameters for playlist export');
    }

    // Create a new playlist
    const createPlaylistUrl = SPOTIFY_ENDPOINTS.CREATE_PLAYLIST.replace('{user_id}', user.id);
    const createPlaylistResponse = await fetch(
        createPlaylistUrl,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: playlistName,
                description: 'Created with Jamming App',
                public: false
            })
        }
    );

    if (!createPlaylistResponse.ok) {
        throw new Error(`Failed to create playlist: ${createPlaylistResponse.status}`);
    }

    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;

    // Get track URIs
    const trackUris = playlist
        .map(song => song.id ? `spotify:track:${song.id}` : null)
        .filter(Boolean);

    if (trackUris.length === 0) {
        throw new Error('No valid track URIs found in playlist');
    }

    // Add tracks to the playlist
    const addTracksUrl = SPOTIFY_ENDPOINTS.ADD_TRACKS.replace('{playlist_id}', playlistId);
    const addTracksResponse = await fetch(
        addTracksUrl,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uris: trackUris })
        }
    );

    if (!addTracksResponse.ok) {
        throw new Error(`Failed to add tracks: ${addTracksResponse.status}`);
    }

    return playlistData;
}; 