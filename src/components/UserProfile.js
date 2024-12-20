import React from 'react';
import '../styles/UserProfile.css';
import spotifyIcon from '../assets/spotify-icon.svg';

const UserProfile = ({ user, onLogin, onLogout }) => {
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

    const avatarUrl = user.images?.[0]?.url || '/default-avatar.png';
    const displayName = user.display_name || 'Spotify User';

    return (
        <div className="profileContainer loggedIn">
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