import React, { useState } from 'react';
import LoginModal from './LoginModal';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import '../styles/UserProfile.css';

const UserProfile = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { user, handleLogout } = useSpotifyAuth();

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