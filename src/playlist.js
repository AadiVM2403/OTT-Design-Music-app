import React, { useState } from 'react';
import './library.css';
import { useNavigate } from 'react-router-dom';


function PlaylistItem({ img, header, title, onRemove, onClick}) {
  return (
    <div className='content' onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={img} alt={title} className="song-image" />
      <div className="user-info">
        <div className="song-name">{header}</div>
        <div className="song-by">{title}</div>
      </div>
      <div className="opp">
        <span
          uk-icon="icon: trash; ratio: 1.25"
          className="icon"
          onClick={onRemove}
          style={{
            cursor: 'pointer',
            transition: 'font-size 0.2s, color 0.2s',
          }}
        >
          <style>
            {`
              .icon:hover rect,
              .icon:hover polyline {
                stroke: red;
              }
            `}
          </style>
        </span>
      </div>
    </div>
  );
}

function Playlist({ handlePlayAllClick , handleSongClick}) {

  const navigate = useNavigate();
  
  const [playlist, setPlaylist] = useState(
    JSON.parse(localStorage.getItem('Playlist')) || []
  );

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const removeFromPlaylist = (index) => {
    const updatedPlaylist = [...playlist];
    updatedPlaylist.splice(index, 1);  
    setPlaylist(updatedPlaylist);  
    localStorage.setItem('Playlist', JSON.stringify(updatedPlaylist));
  };

  return (
    <div className='Playlist'>
      <div uk-icon="icon: chevron-left; ratio: 2" onClick={handleBackButtonClick} style={{ cursor: 'pointer' }} />
      <div className='recent-buttons'>
          <button className={`share`}>Share</button>
          <button className={`play-all`} onClick={handlePlayAllClick}>Play All</button>
        </div>
      <div className='headers-wrapper' >
        <div className="header-content">Playlist</div>
      </div>
      {playlist.map((song, index) => (
        <PlaylistItem
          key={index}
          img={song.thumbnail}
          header={song.name}
          title={song.artist}
          onRemove={() => removeFromPlaylist(index)}
          onClick={() => handleSongClick(index)}
        />
      ))}
    </div>
  );
}

export default Playlist;
