import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import MusicPlayerBar from './miniplayer';
import CustomPlayerBar from './customplayer'; 
import { MusicPlayerProvider } from './MusicPlayerContext';

function MainPage({ showCustomPlayer, setShowCustomPlayer , i , setI}) {
  const location = useLocation();

  const shouldShowFooter = [
    '/Main',
    '/Main/home',
    '/Main/search',
    '/Main/library',
    '/Main/callertune',
  ].includes(location.pathname);

  const isSongCardPage = location.pathname === '/Main/home/song';

  
  useEffect(() => {
    if (isSongCardPage) {
      setShowCustomPlayer(false);
    } 
  }, [isSongCardPage, setShowCustomPlayer]);

  const musicPlayerBarStyle = shouldShowFooter
    ? { bottom: '6%' }
    : isSongCardPage
    ? { display: 'none' }
    : { bottom: '0' };

  return (
    <MusicPlayerProvider>
      <div className='MainPage'>
        <Outlet />
        {shouldShowFooter && <Footer initialClickedIcon="home" />}
        {showCustomPlayer ? (
          <CustomPlayerBar style={musicPlayerBarStyle} i={i} setI={setI}/>
        ) : (
          <MusicPlayerBar style={musicPlayerBarStyle} />
        )}
      </div>
    </MusicPlayerProvider>
  );
}

export default MainPage;
