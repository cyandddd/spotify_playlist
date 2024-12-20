import React from 'react';
import '../styles/UserProfile.css';

const UserProfile = ({ user, onLogin, onLogout }) => {
    if (!user) {
        return (
            <div className="profileContainer">
                <button 
                    className="loginButton" 
                    onClick={onLogin}
                >
                    Login with Spotify
                </button>
            </div>
        );
    }

    const avatarUrl = user.images?.[0]?.url || '/default-avatar.png';
    const displayName = user.display_name || 'Spotify User';

    return (
        <div className="profileContainer">
            <img 
                src={avatarUrl} 
                alt={`${displayName}'s avatar`} 
                className="avatar"
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