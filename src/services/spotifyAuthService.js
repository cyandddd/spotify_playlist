/**
 * Service for handling Spotify authentication
 */

export const getAccessToken = async (code) => {
    try {
        const verifier = localStorage.getItem("verifier");
        
        const params = new URLSearchParams();
        params.append("client_id", process.env.REACT_APP_SPOTIFY_CLIENT_ID);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", process.env.REACT_APP_REDIRECT_URI);
        
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(
                    process.env.REACT_APP_SPOTIFY_CLIENT_ID + ":" + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
                )
            },
            body: params
        });
        console.log('Token response:', result);
        const { access_token, refresh_token } = await result.json();
        console.log('Token data:', { access_token, refresh_token });
        
        // Store tokens
        localStorage.setItem("spotify_access_token", access_token);
        localStorage.setItem("spotify_refresh_token", refresh_token);
        
        return access_token;
    } catch (error) {
        console.error("Error getting access token:", error);
        return null;
    }
};

export const handleCallback = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const storedState = localStorage.getItem('spotify_auth_state');
    
    // Verify state to prevent CSRF attacks
    if (state === null || state !== storedState) {
        throw new Error('State mismatch');
    }
    
    // Clear state
    localStorage.removeItem('spotify_auth_state');
    
    // Exchange code for token
    if (code) {
        return await getAccessToken(code);
    }
    
    return null;
}; 