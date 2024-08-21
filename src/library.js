import React, { useState } from 'react';
import "./library.css";
import img1 from './img1.jpg';
import { useNavigate } from 'react-router-dom';

function ContentItem({ header, title }) {
  return (
    <div className='content'>
      <img src={img1} alt={title} className="song-image" />
      <div className="user-info">
        <div className="song-name">{header}</div>
        <div className="song-by">{title}</div>
      </div>
      <div className="opp">
        <span>&#8942;</span>
      </div>
    </div>
  );
}

function PlaylistItem ({img ,header, title }) {
  return (
    <div className='content'>
      <img src={img} alt={title} className="song-image" />
      <div className="user-info">
        <div className="song-name">{header}</div>
        <div className="song-by">{title}</div>
      </div>
      <div className="opp">
        <span
          uk-icon="icon: trash; ratio: 1.25"
          className="icon"
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


function LibraryContent() {
    const navigate = useNavigate();
    const [isMusicSelected, setIsMusicSelected] = useState(false);
    const [isDownloadsSelected, setIsDownloadsSelected] = useState(false);
    const [isPlaylistsSelected, setIsPlaylistsSelected] = useState(false);
    const [isSongsSelected, setIsSongsSelected] = useState(false);
    const [isAlbumsSelected, setIsAlbumsSelected] = useState(false);
    const [isArtistsSelected, setIsArtistsSelected] = useState(false);

    const handleMusicButtonClick = () => {
      setIsMusicSelected(true);
      setIsDownloadsSelected(false); 
    };

    const handleDownloadsButtonClick = () => {
      setIsDownloadsSelected(true);
      setIsMusicSelected(false); 
    };

    const handlePlaylistsButtonClick = () => {
      setIsPlaylistsSelected(true);
      setIsAlbumsSelected(false);
      setIsSongsSelected(false)
      setIsArtistsSelected(false) 
    };

    const handleSongsButtonClick = () => {
      setIsSongsSelected(true);
      setIsAlbumsSelected(false);
      setIsPlaylistsSelected(false)
      setIsArtistsSelected(false) 
    };

    const handleAlbumsButtonClick = () => {
      setIsAlbumsSelected(true);
      setIsPlaylistsSelected(false);
      setIsSongsSelected(false)
      setIsArtistsSelected(false) 
    };

    const handleArtistsButtonClick = () => {
      setIsArtistsSelected(true);
      setIsAlbumsSelected(false);
      setIsSongsSelected(false)
      setIsPlaylistsSelected(false) 
    };

  const playlist = JSON.parse(localStorage.getItem('Playlist')) || [];
  const Initialplaylist = playlist.slice(0, 3);

  const toggleViewplaylist = () => {
    navigate("/Main/library/playlist"); 
  };



  return (
      <div className='library'>
          <div className="buttons-upper">
              <button
                className={`circular ${isMusicSelected ? 'selected' : ''}`}
                onClick={handleMusicButtonClick}
              >
                Music
              </button>
              <button
                className={`circular ${isDownloadsSelected ? 'selected' : ''}`}
                onClick={handleDownloadsButtonClick}
              >
                Downloads
              </button>
          </div>
          <div className="line"></div>
          <div className="buttons-bottom">
            <button
              className={`circular ${isPlaylistsSelected ? 'selected' : ''}`}
              onClick={handlePlaylistsButtonClick}
            >
              Playlists
            </button>
            <button
              className={`circular ${isSongsSelected ? 'selected' : ''}`}
              onClick={handleSongsButtonClick}
            >
              Songs
            </button>
            <button
              className={`circular ${isAlbumsSelected ? 'selected' : ''}`}
              onClick={handleAlbumsButtonClick}
            >
              Albums
            </button>
            <button
              className={`circular ${isArtistsSelected ? 'selected' : ''}`}
              onClick={handleArtistsButtonClick}
            >
              Artists
            </button>
          </div>
      <div className='headers-wrapper' >
        <div className="header-content">Recents</div> 
      </div>
      <ContentItem header="Header" title="Name"/>
      <ContentItem header="Header" title="Name"/>
      <ContentItem header="Header" title="Name"/>
      <div>
        <button className='all'>View All</button>
      </div>
      <div className='headers-wrapper' >
        <div className="header-content">Playlist</div> 
      </div>
      {Initialplaylist.map((song, index) => (
        <PlaylistItem key={index} img={song.thumbnail} header={song.name} title={song.artist} />
      ))}
      <div>
        <button className='all' onClick={toggleViewplaylist}>View All</button>
      </div>
      <div className='headers-wrapper' >
        <div className="header-content">Albums</div> 
      </div>
      <ContentItem header="Header" title="Name"/>
      <ContentItem header="Header" title="Name"/>
      <ContentItem header="Header" title="Name"/>
      <div>
        <button className='all'>View All</button>
      </div>
    </div>
  );
}

export default LibraryContent;


