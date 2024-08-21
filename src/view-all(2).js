import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './view-all(2).css';
import UIkit from 'uikit';
import UIkitIcons from 'uikit/dist/js/uikit-icons';
import DataContext from './DataContext';

function View2() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const i = queryParams.get('catIndex');

  const [data, setData] = useState({});
  const datavalue = useContext(DataContext);
  const [dataFetched, setDataFetched] = useState(false);

  const main = JSON.parse(localStorage.getItem('songData'));

  useEffect(() => {
    async function fetchData() {
      try {
        if (main.categories && main.categories[i] && main.categories[i].mlink) {
          const mlink = main.categories[i].mlink;

          const Response = await fetch(`https://aditi.ipadlive.com/mod_cms/api/apti.music.app.php?buildid=BUDDIEBEATZ&androidid=0717993a01f417ed&pl=HMD Global Nokia 5.4&ei=&cc=&mver=0000004&nc=&ims=&loc=&ver=APTINEW0010&apiver=0.3&country=ZWE&operator=ECONET&locale=en&lang=en&uniquecustomid=230506162135034&ui=mhyw88awx5pd436j&ckey=&dkey=27abqqmzmzk22dvc&ua=Mozilla/5.0 (Linux; Android 12; Nokia 5.4 Build/SKQ1.220119.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36&email=&sw=720&sh=1406&versioncode=35&referrer=utm_source=google-play&utm_medium=organic&referrerdt=06-May-2023&socialid=&conn=wifi&conntype=&invitecode=&subtype=null&cgr=0&promoparams=&phno=263784763448${mlink}`);

          if (Response.ok) {
            const ResponseData = await Response.json();
            setData(ResponseData);
            datavalue.setData(ResponseData);
            setDataFetched(true);
          } else {
            console.error('Failed to fetch data from mlink:', Response.statusText);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    if (!dataFetched) {
      fetchData();
    }
  }, [dataFetched, datavalue, i, main]);

  localStorage.setItem('extendedData', JSON.stringify(data));

  useEffect(() => {
    UIkit.use(UIkitIcons);
  }, []);

  const ContentItem = ({ imgSrc, songName, artistName, x , Song}) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };

    const existingPlaylist = JSON.parse(localStorage.getItem('Playlist')) || [];

    const [playlist, setPlaylist] = useState(existingPlaylist);
    
    const AddtoPlaylist = () => {
      const newSong = {
          name: songName,
          artist: artistName,
          thumbnail: imgSrc,
          audio: Song,
      };
       
      const updatedPlaylist = [...playlist, newSong];
      
      setPlaylist(updatedPlaylist);
      localStorage.setItem('Playlist', JSON.stringify(updatedPlaylist));
  };

    return (
      <div className='content-all' onClick={() => handleContentClick(x)} style={{ cursor: 'pointer' }}>
        <img src={imgSrc} alt={songName} className="image-song"  />
        <div className="main-type">
          <div className="name-song">{songName}</div>
          <div className="by-song">{artistName}</div>
        </div>
        <div className="end">
          <span uk-icon="icon: download; ratio: 1.5" className='download'></span>
          <div className="custom-dropdown-container">
            <span className="custom-dropdown-toggle" onClick={toggleDropdown}>
              &#8942;
            </span>
            {isDropdownVisible && (
              <div className="custom-dropdown-content">
                <ul>
                  <li onClick={AddtoPlaylist} >Add to playlist</li>
                  <li>Remove from playlist</li>
                  <li>Share Song</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  

  function handleContentClick(x) {
    navigate(`/Main/home/song?catIndex=${i}&slideIndex=${x}`);
  }

  const contentData = data.categories && data.categories[0] && data.categories[0].items
    ? data.categories[0].items.map(item => ({
      imgSrc: item.thumbnail,
      songName: item.name,
      artistName: item.sdesc,
      Song: item.flink
    }))
    : [];

  const slides = Array.from({ length: contentData.length }, (_, index) => index); 

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

  return (
    <div className="Recent">
      <div className="top-section">
        <div className="icons">
          <div className='left-side'>
            <span uk-icon="icon: chevron-left; ratio: 2" className="icon" onClick={handleBackButtonClick} style={{ cursor: 'pointer' }} />
          </div>
          <div className='right-side'>
            <span uk-icon="icon: search; ratio:1.5" className="icon" />
            <span uk-icon="icon: more-vertical; ratio:1.5" className="icon" />
          </div>
        </div>
        <div className='type'>
          <div className='page-type'>{data.categories && data.categories[0] ? data.categories[0].name : ''}</div>
          <div className='num'>{contentData.length} Songs | 2 downloaded </div>
        </div>
        <div className='recent-buttons'>
          <button className={`share`}>Share</button>
          <button className={`play-all`} onClick={() => handleContentClick(0)}>Play All</button>
        </div>
        <div className='headers-wrapper'>Top Songs</div>
      </div>
      <div className="bottom-section">
        {contentData.map((data, index) => (
          <ContentItem
            key={index}
            imgSrc={data.imgSrc}
            songName={data.songName}
            artistName={data.artistName}
            x={slides[index % slides.length]} 
          />
        ))}
      </div>
    </div>
  );
}

export default View2;


