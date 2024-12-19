import React, { useState } from 'react';
import LoginModal from './LoginModal';
import '../styles/UserProfile.css';

const UserProfile = ({ user, onLogin }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLogout = () => {
        // Clear the access token from localStorage
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_token_timestamp');
        localStorage.removeItem('spotify_refresh_token');
        
        // Clear any other Spotify-related data from storage
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('spotify_')) {
                localStorage.removeItem(key);
            }
        });

        // Clear user data by calling onLogin with null
        onLogin(null);

        // Optional: Redirect to home or refresh the page
        window.location.reload();
    };

    if (!user) {
        return (
            <div className="user-profile">
                <button 
                    className="login-button" 
                    onClick={() => setShowLoginModal(true)}
                >
                    Login with Spotify
                </button>
                {showLoginModal && (
                    <LoginModal 
                        isOpen={showLoginModal} 
                        onClose={() => setShowLoginModal(false)} 
                    />
                )}
            </div>
        );
    }

    const avatarUrl = user.images?.[0]?.url || '/default-avatar.png';
    const displayName = user.display_name || 'Spotify User';

    return (
        <div className="user-profile">
            <div className="avatar-container">
                <img 
                    src={avatarUrl} 
                    alt={`${displayName}'s avatar`} 
                    className="user-avatar"
                />
            </div>
            <span className="user-name">{displayName}</span>
            <button 
                className="logout-button" 
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default UserProfile; 