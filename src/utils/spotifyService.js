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
    console.log('Access Token:', accessToken);
};

export const searchTracks = async (title) => {
    if (!accessToken) {
        await authenticateSpotify();
    }
    const response = await fetch(`https://api.spotify.com/v1/search?q=${title}&type=track`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    console.log('API Response:', data); // Log the entire response
    if (data.tracks && data.tracks.items) {
        return data.tracks.items;
    } else {
        console.error('Unexpected API response structure:', data);
        return [];
    }
};