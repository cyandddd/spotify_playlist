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
    const generateRandomString = (length) => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    const handleLogin = () => {
        const state = generateRandomString(16);
        localStorage.setItem('spotify_auth_state', state);

        const scopes = [
            'user-read-private',
            'user-read-email',
            'playlist-modify-public',
            'playlist-modify-private'
        ].join(' ');

        const authUrl = new URLSearchParams({
            response_type: 'code',
            client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
            scope: scopes,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            state: state,
            show_dialog: true
        });

        window.location.href = 'https://accounts.spotify.com/authorize?' + authUrl.toString();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="login-modal" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Welcome to Jamming</h2>
                <p>Connect with Spotify to create and manage your playlists. Discover and save your favorite tracks with ease.</p>
                <button 
                    className="spotify-auth-btn"
                    onClick={handleLogin}
                >
                    Connect with Spotify
                </button>
            </div>
        </div>
    );
};

export default LoginModal;