/**
 * LoginModal Component
 * 
 * A React component that handles Spotify authentication through a modal interface.
 * Implements OAuth 2.0 authorization code flow with state parameter for security.
 * 
 * Props:
 * - isOpen: Boolean to control modal visibility
 * - onClose: Function to handle modal closing
 * 
 * Features:
 * - Secure random state generation
 * - Spotify scopes configuration
 * - Authorization URL construction
 * - User-friendly login interface
 */

import React from 'react';
import '../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
    // Generates random string for OAuth state parameter
    const generateRandomString = (length) => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    // Handles Spotify OAuth flow initiation
    const handleLogin = () => {
        // Generate state for security
        const state = generateRandomString(16);
        // Store state in localStorage to verify when token returns
        localStorage.setItem('spotify_auth_state', state);

        // Define required Spotify API access scopes
        const scopes = [
            'user-read-private',
            'user-read-email',
            'playlist-modify-public',
            'playlist-modify-private'
        ].join(' ');

        // Construct authorization URL with all required parameters
        const authUrl = new URLSearchParams({
            response_type: 'code',
            client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
            scope: scopes,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            state: state,
            show_dialog: true // Forces the user to approve the app every time
        });

        // Redirect to Spotify authorization page
        window.location.href = 'https://accounts.spotify.com/authorize?' + authUrl.toString();
    };

    // Render modal UI
    return (
        <div className="modal-overlay">
            <div className="login-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Connect with Spotify</h2>
                <p>Log in to create and save playlists to your Spotify account.</p>
                <button 
                    className="spotify-auth-btn"
                    onClick={handleLogin}
                >
                    Continue with Spotify
                </button>
            </div>
        </div>
    );
};

export default LoginModal;