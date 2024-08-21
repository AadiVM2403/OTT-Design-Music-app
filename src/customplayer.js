import React, { useRef , useCallback, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'; 
import './miniplayer.css';

const playlist = JSON.parse(localStorage.getItem('Playlist')) || [];

function CustomPlayerBar({ style,  isPlayingFromPlaylist , i, setI}) {
    const [isPlaying, setIsPlaying] = useState(false); 
    const audioRef = useRef(null);

    useEffect(() => {
      setIsPlaying(isPlayingFromPlaylist);
    }, [isPlayingFromPlaylist]);

    const totalSongs = playlist?.length || 0;
  
    const handlePlayButtonClick = () => {
        const audio = audioRef.current;
      
        if (audio) {
          if (isPlaying) {
            audio.pause();
          } else {
            audio.play().catch(error => {
              console.error("Audio play error:", error);
            });
          }
      
          setIsPlaying(!isPlaying);
        }
    };

    const playNextSong = useCallback(() => {
        const audio = audioRef.current;

        if (audio && isPlaying) {
          audio.pause();
          setIsPlaying(false);
        }
        
        const nextIndex = (i + 1 + totalSongs) % totalSongs;
        setI(nextIndex); 
        
    }, [isPlaying, audioRef, i, setI, totalSongs]);

    const playPrevSong = useCallback(() => {
        const audio = audioRef.current;

        if (audio && isPlaying) {
          audio.pause();
          setIsPlaying(false);
        }
        
        const prevIndex = (i - 1 + totalSongs) % totalSongs;
        setI(prevIndex); 
        
    }, [isPlaying, audioRef, i, setI, totalSongs]);

    
  return (
    <div className="music-player-bar" style={style}>
      {playlist ? (
        <div className="music-player-info">
          <img src={playlist?.[i]?.thumbnail} alt="Album Cover" style={{ cursor: 'pointer' }} />
          <div className="music-info" style={{ cursor: 'pointer' }}>
            <div className="song-title">{playlist?.[i]?.name}</div>
            <div className="artist">{playlist?.[i]?.artist}</div>
          </div>
        </div>
      ) : (
        <div className="music-player-info">
          Loading...
        </div>
      )}
      <audio ref={audioRef} src={playlist?.[i]?.audio} controls />
      <div className="music-player-controls">
        <FontAwesomeIcon icon={faBackward} onClick={playPrevSong} />
        {isPlaying ? (
          <FontAwesomeIcon icon={faPause} onClick={handlePlayButtonClick} />
        ) : (
          <FontAwesomeIcon icon={faPlay} onClick={handlePlayButtonClick} />
        )}
        <FontAwesomeIcon icon={faForward} onClick={playNextSong} />
      </div>
    </div>
  );
}

export default CustomPlayerBar;
