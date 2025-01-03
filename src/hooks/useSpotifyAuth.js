import { useState, useEffect } from 'react';
import { handleCallback } from '../services/spotifyAuthService';
import { SPOTIFY_ENDPOINTS } from '../constants/spotifyConstants';

/**
 * Custom hook for managing Spotify authentication state and operations
 * @returns {Object} Authentication state and methods
 */
export const useSpotifyAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for existing token on mount
        const storedToken = localStorage.getItem('spotify_access_token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            fetchUserProfile(storedToken);
        }
    }, []);

    useEffect(() => {
        // Handle OAuth callback
        const handleAuth = async () => {
            try {
                if (window.location.search.includes('code=')) {
                    const newToken = await handleCallback();
                    if (newToken) {
                        setToken(newToken);
                        setIsAuthenticated(true);
                        await fetchUserProfile(newToken);
                        window.history.pushState({}, null, '/');
                    }
                }
            } catch (error) {
                console.error('Authentication error:', error);
                setIsAuthenticated(false);
            }
        };

        handleAuth();
    }, []);

    const fetchUserProfile = async (accessToken) => {
        try {
            const response = await fetch(SPOTIFY_ENDPOINTS.ME, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log('User profile response:', response);
            if (response.ok) {
                const userData = await response.json();
                console.log('User profile data:', userData);
                setUser(userData);
            } else {
                console.error('Failed to fetch user profile:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleLogout = () => {
        // Only remove Spotify-specific items
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_token_timestamp');
        localStorage.removeItem('spotify_refresh_token');
        
        // Clear any other Spotify-related items
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('spotify_')) {
                localStorage.removeItem(key);
            }
        });

        setUser(null);
        setToken('');
        setIsAuthenticated(false);
    };

    return {
        user,
        token,
        isAuthenticated,
        handleLogout,
        fetchUserProfile
    };
}; 