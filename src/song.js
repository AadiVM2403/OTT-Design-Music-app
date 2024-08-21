import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './song.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'; 
import { useMusicPlayer } from './MusicPlayerContext';

function SongCard() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const i = queryParams.get('catIndex');
    const x = queryParams.get('slideIndex'); 
    const z = queryParams.get('songIndex'); 

    const [isPlaying, setIsPlaying] = useState(false); 
    const [currentTime, setCurrentTime] = useState(0); 
    const [totalTime, setTotalTime] = useState(0); 
    const audioRef = useRef(null);
    const [isRed, setIsRed] = useState(false);
    const [shuffleOn, setshuffleOn] = useState(false);
    const { setCurrentSong } = useMusicPlayer();
    
    const data = JSON.parse(localStorage.getItem('songData'));
    const moredata = JSON.parse(localStorage.getItem('extendedData'));
    const album = JSON.parse(localStorage.getItem('albumSong'));
    const morealbum = JSON.parse(localStorage.getItem('morealbumSong'));

    let Name, By, img, Song;
    if (z) {
        if (x <= 3) {
            Name = album?.categories?.[0]?.items?.[z]?.name;
            By = album?.categories?.[0]?.items?.[z]?.sdesc;
            img = album?.categories?.[0]?.items?.[z]?.thumbnail;
            Song = album?.categories?.[0]?.items?.[z]?.flink;
        } else {
            const adjustedZ = z >= 4 ? z % morealbum?.categories?.[0]?.items?.length : z;
            Name = morealbum?.categories?.[0]?.items?.[adjustedZ]?.name;
            By = morealbum?.categories?.[0]?.items?.[adjustedZ]?.sdesc;
            img = morealbum?.categories?.[0]?.items?.[adjustedZ]?.thumbnail;
            Song = morealbum?.categories?.[0]?.items?.[adjustedZ]?.flink;
        }
    } else {
        if (x <= 3) {
            Name = data?.categories?.[i]?.items?.[x]?.name;
            By = data?.categories?.[i]?.items?.[x]?.sdesc;
            img = data?.categories?.[i]?.items?.[x]?.thumbnail;
            Song = data?.categories?.[i]?.items?.[x]?.flink;
        } else {
            const adjustedX = x >= 4 ? x % moredata?.categories?.[0]?.items?.length : x;
            Name = moredata?.categories?.[0]?.items?.[adjustedX]?.name;
            By = moredata?.categories?.[0]?.items?.[adjustedX]?.sdesc;
            img = moredata?.categories?.[0]?.items?.[adjustedX]?.thumbnail;
            Song = moredata?.categories?.[0]?.items?.[adjustedX]?.flink;
        }
    }

    const handleHeartClick = () => {
        setIsRed(!isRed);
    };

    const handleshuffleClick = () => {
        setshuffleOn(!shuffleOn);
    };

    const handleBackButtonClick = () => {
        navigate('/Main/home');
    };

    const playNextSong = useCallback(() => {
        const audio = audioRef.current;

        if (audio && isPlaying) {
          audio.pause();
          setIsPlaying(false);
        }

        if (z) {
            const totalSongs = morealbum?.categories?.[0]?.items?.length || 0;
            if (shuffleOn) {
                const randomIndex = Math.floor(Math.random() * totalSongs); 
                navigate(`/Main/home/song?catIndex=${i}&slideIndex=${x}&songIndex=${randomIndex}`);
            } else {
                const nextZ = (parseInt(z) + 1 + totalSongs) % totalSongs; 
                navigate(`/Main/home/song?catIndex=${i}&slideIndex=${x}&songIndex=${nextZ}`);
            }
        } else {
            const totalSongs = moredata?.categories?.[0]?.items?.length || 0;
            if (shuffleOn) {
                const randomIndex = Math.floor(Math.random() * totalSongs);
                navigate(`/Main/home/song?catIndex=${i}&slideIndex=${randomIndex}`);
            } else {
                const nextX = (parseInt(x) + 1 + totalSongs) % totalSongs; 
                navigate(`/Main/home/song?catIndex=${i}&slideIndex=${nextX}`);
            }
        }
    }, [i, x, z, navigate, isPlaying, audioRef, shuffleOn, moredata, morealbum]);

    const playPrevSong = useCallback(() => {
        const audio = audioRef.current;

        if (audio && isPlaying) {
            audio.pause();
            setIsPlaying(false); 
        }

        if (z) {
            const totalSongs = morealbum?.categories?.[0]?.items?.length || 0;
            const prevZ = (parseInt(z) - 1 + totalSongs) % totalSongs; 
            navigate(`/Main/home/song?catIndex=${i}&slideIndex=${x}&songIndex=${prevZ}`);
        } else {
            const totalSongs = moredata?.categories?.[0]?.items?.length || 0;
            const prevX = (parseInt(x) - 1 + totalSongs) % totalSongs; 
            navigate(`/Main/home/song?catIndex=${i}&slideIndex=${prevX}`);
        }
    }, [i, x, z, navigate, isPlaying, audioRef, moredata, morealbum]);

    useEffect(() => {
        const audio = audioRef.current;
    
        audio.addEventListener('loadedmetadata', () => {
            setTotalTime(audio.duration);
        });
    
        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
        });
    })
    

    useEffect(() => {
        const audio = audioRef.current;

        const handleSongEnd = () => {
            playNextSong(); 
        };

        audio.addEventListener('ended', handleSongEnd);
        return () => {
            audio.removeEventListener('ended', handleSongEnd); 
        };
    }, [playNextSong, audioRef]);

    useEffect(() => {
        setIsRed(false);
    }, [x]); 

    const handleSeek = (e) => {
        const audio = audioRef.current;
        const progressBar = e.currentTarget;
        const clickX = e.clientX - progressBar.getBoundingClientRect().left;
        const percent = clickX / progressBar.offsetWidth;
        const seekTime = percent * audio.duration;

        if (!isNaN(seekTime)) {
            audio.currentTime = seekTime;
        }
    };

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const handleRefresh = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = 0; 
        }
    };
    
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

    useEffect(() => {
        setCurrentSong({
          name: Name,
          artist: By,
          thumbnail: img,
          audio: Song,
          playNextSong: playNextSong,
          playPrevSong: playPrevSong,
          isPlaying: isPlaying,
          handlePlayButtonClick: handlePlayButtonClick,
          audioRef: audioRef,
          i:i,
          x:x,
          z:z,

        });
    })

    const existingPlaylist = JSON.parse(localStorage.getItem('Playlist')) || [];
    
    const [playlist, setPlaylist] = useState(existingPlaylist);
    
    const AddtoPlaylist = () => {
        const newSong = {
            name: Name,
            artist: By,
            thumbnail: img,
            audio: Song,
        };
         
        const updatedPlaylist = [...playlist, newSong];
        
        setPlaylist(updatedPlaylist);
        localStorage.setItem('Playlist', JSON.stringify(updatedPlaylist));
    };

    return (
        <div className='Song'>
            <div className="toggle">
                <span uk-icon="icon: chevron-left; ratio: 2" className="icon" onClick={handleBackButtonClick} style={{ cursor: 'pointer' }} />
                <span className="playing">Now Playing</span>
                <span uk-icon="icon: menu; ratio: 2" className="icon" />
            </div>
            <div className="MainCard" >
                <div className="About">
                    <div className="Song-Name">{Name}</div>
                    <div className="Song-by">{By}</div>
                </div>
                <div className="Song-img">
                    <img src={img} className="Song-cover" alt="damn" />
                </div>
                <div className="icon-bar1">
                    <span uk-icon="icon: social; ratio: 2" className="icon" />
                    <span uk-icon="icon: download; ratio: 2" className="icon" />
                    <span className="icon" />
                    <span
                        uk-icon="icon: plus-circle; ratio: 2"
                        className="icon"
                        onClick={AddtoPlaylist}
                        style={{
                            cursor: 'pointer',
                            transition: 'font-size 0.2s, color 0.2s',
                        }}
                        >
                        <style>
                            {`
                            .icon:hover line,
                            .icon:hover circle, 
                            .icon:hover polyline,
                            .icon:hover path,
                            .icon:hover rect{
                                stroke: red;
                            }
                            `}
                        </style>
                    </span>
                    <span
                        uk-icon="icon: heart; ratio: 2"
                        className={`${isRed ? ' red' : ''}`}
                        onClick={handleHeartClick}
                    />
                </div>
                <div className="icon-bar2">
                    <FontAwesomeIcon  
                        icon={faShuffle} 
                        size="2x"
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '20px'
                        }}
                        className={`${shuffleOn ? 'shuffle' : ''}`}
                        onClick={handleshuffleClick}
                    />
                    <span uk-icon="icon: chevron-double-left; ratio: 2.5" className="icon"  onClick={playPrevSong} />
                    <div className="circle-container">
                        <div className="circle" onClick={handlePlayButtonClick}>
                            {/* Conditional rendering based on play/pause state */}
                            {isPlaying ? (
                                <FontAwesomeIcon icon={faPause} className="play-icon" />
                            ) : (
                                <FontAwesomeIcon icon={faPlay} className="play-icon" />
                            )}
                        </div>
                    </div>
                    <span uk-icon="icon: chevron-double-right; ratio: 2.5" className="icon" onClick={playNextSong} />
                    <span uk-icon="icon: refresh; ratio: 2" className="icon" onClick={handleRefresh} />
                </div>
                <div className="music">
                    <div className='player'>
                        <div className="audio-time">
                            {formatTime(currentTime)}
                        </div>
                        <div className='music-bar' onClick={handleSeek}>
                            <audio ref={audioRef} src={Song}  />
                            <input
                                type="range"
                                min="0"
                                className='music-bar-input'
                                max={totalTime} 
                                value={currentTime}
                                onChange={(e) => {
                                    if (audioRef.current) {
                                        const newTime = (e.target.value / 100) * totalTime; 
                                        audioRef.current.currentTime = newTime;
                                    }
                                }}
                            />
                        </div>
                        <div className="audio-time">
                            {formatTime(totalTime)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongCard;
