import React, { useState } from 'react';
import '../styles/UserProfile.css';
import spotifyIcon from '../assets/spotify-icon.svg';

const UserProfile = ({ user, onLogin, onLogout }) => {
    const [avatarError, setAvatarError] = useState(false);

    if (!user) {
        return (
            <div className="profileContainer">
                <button 
                    className="loginButton" 
                    onClick={onLogin}
                >
                    <img src={spotifyIcon} alt="Spotify" className="spotify-icon" />
                    <span>Login</span>
                </button>
            </div>
        );
    }

    // Get the best available avatar URL
    const getAvatarUrl = () => {
        if (avatarError) {
            return spotifyIcon; // Use Spotify icon as ultimate fallback
        }
        
        if (user.images && user.images.length > 0) {
            // Sort images by size and get the most appropriate one
            const sortedImages = [...user.images].sort((a, b) => {
                // Prefer images around 64x64 for avatars
                const aSize = a.width || 0;
                const bSize = b.width || 0;
                const aDiff = Math.abs(aSize - 64);
                const bDiff = Math.abs(bSize - 64);
                return aDiff - bDiff;
            });
            return sortedImages[0].url;
        }
        
        return spotifyIcon; // Use Spotify icon as fallback
    };

    const displayName = user.display_name || 'Spotify User';
    const avatarUrl = getAvatarUrl();

    return (
        <div className="profileContainer loggedIn">
            <img 
                src={avatarUrl} 
                alt={`${displayName}'s avatar`} 
                className="avatar"
                onError={() => setAvatarError(true)}
            />
            <span className="userName">{displayName}</span>
            <button 
                className="logoutButton" 
                onClick={onLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default UserProfile; 