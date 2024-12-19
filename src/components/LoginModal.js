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
        // Generate state for security
        const state = generateRandomString(16);
        // Store state in localStorage to verify when token returns
        localStorage.setItem('spotify_auth_state', state);

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

        window.location.href = 'https://accounts.spotify.com/authorize?' + authUrl.toString();
    };

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