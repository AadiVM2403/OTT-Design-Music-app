import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { useMusicPlayer } from './MusicPlayerContext';
import { useNavigate } from 'react-router-dom'; 
import './miniplayer.css';


function MusicPlayerBar({ style }) {
  const { currentSong} = useMusicPlayer();
  const navigate = useNavigate(); 
  const goToSongPage = () => {
    if (currentSong) {
      const { i, x, z } = currentSong;
      const query = `catIndex=${i}&slideIndex=${x}${z !== null ? `&songIndex=${z}` : ''}`;
      navigate(`/Main/home/song?${query}`);
    }
  };

  return (
    <div className="music-player-bar" style={style}>
      {currentSong ? (
        <div className="music-player-info">
          <img src={currentSong?.thumbnail } alt="Album Cover" onClick={goToSongPage} style={{ cursor: 'pointer' }} />
          <div className="music-info" onClick={goToSongPage} style={{ cursor: 'pointer' }}>
            <div className="song-title">{currentSong?.name }</div>
            <div className="artist">{currentSong?.artist }</div>
          </div>
        </div>
      ) : (
        <div className="music-player-info">
          Loading...
        </div>
      )}
      <audio ref={currentSong?.audioRef} src={currentSong?.audio} controls />
      <div className="music-player-controls">
        <FontAwesomeIcon icon={faBackward} onClick={currentSong?.playPrevSong} />
        {currentSong?.isPlaying ? (
          <FontAwesomeIcon icon={faPause} onClick={currentSong?.handlePlayButtonClick} />
        ) : (
          <FontAwesomeIcon icon={faPlay} onClick={currentSong?.handlePlayButtonClick} />
        )}
        <FontAwesomeIcon icon={faForward} onClick={currentSong?.playNextSong} />
      </div>
    </div>
  );
}

export default MusicPlayerBar;
