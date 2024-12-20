import React from 'react';
import styles from '../styles/SongDetailInPlaylist.module.css';

const SongDetailInPlaylist = ({ song, onRemove }) => {
    return (
        <div className={styles.songDetail}>
            <div className={styles.albumCoverSection}>
                {song.albumCover && (
                    <img 
                        src={song.albumCover} 
                        alt={`${song.album} cover`}
                        className={styles.albumCover}
                    />
                )}
            </div>
            <div className={styles.songInfo}>
                <h2 className={styles.title}>{song.title || 'Unknown Title'}</h2>
                <p className={styles.artist}>Artist: {song.artist || 'Unknown Artist'}</p>
                <p className={styles.album}>Album: {song.album || 'Unknown Album'}</p>
            </div>
            <div className={styles.removeSection}>
                <button className={styles.removeButton} onClick={() => onRemove(song)}>
                    Remove
                </button>
            </div>
        </div>
    );
};

export default SongDetailInPlaylist;

