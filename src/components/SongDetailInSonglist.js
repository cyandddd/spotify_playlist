import React from 'react';
import styles from '../styles/SongDetailInSonglist.module.css';

const SongDetailInSonglist = ({ song, onAdd, inPlaylist }) => {
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
            <div className={styles.addSection}>
                <button 
                    className={`${styles.addButton} ${inPlaylist ? styles.added : ''}`} 
                    onClick={() => !inPlaylist && onAdd(song)}
                    disabled={inPlaylist}
                >
                    {inPlaylist ? 'Added' : 'Add'}
                </button>
            </div>
        </div>
    );
};

export default SongDetailInSonglist;