import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import PhoneContext from './PhoneContext';
import DataContext from './DataContext';
import OpenComponent from './open';
import LoginPage from './login';
import Otp from './otp';
import MainPage from './Main';
import HomeContent from './home';
import SearchContent from './search';
import LibraryContent from './library';
import CallertuneContent from './callertune';
import img1 from './img2.png';
import View2 from './view-all(2)';
import SongCard from './song';
import View1 from './view-all(1)';
import Profile from './profile';
import AlbumCard from './album';
import Playlist from './playlist';

const RouterPath = () => {
  const [PhoneNumber, setPhoneNumber] = useState('');
  const IsPhoneContext = { PhoneNumber, setPhoneNumber };

  const [data, setData] = useState({});
  const IsDataContext = { data, setData };

  const [showCustomPlayer, setShowCustomPlayer] = useState(false);
  
  

const [i, setI] = useState(0);

const handlePlayAllClick = () => {
  setI(0);
  setShowCustomPlayer(true);
};

const handleSongClick = (index) => {
  setI(index); 
  setShowCustomPlayer(true);
};


  const routes = [
    {
      path: '/',
      element: <OpenComponent />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/otp',
      element: <Otp />,
    },
    {
      path: '/Main',
      element: <MainPage showCustomPlayer={showCustomPlayer} setShowCustomPlayer = {setShowCustomPlayer} i={i} setI={setI}/>,
      children: [
        {
          path: '/',
          index: true,
          element: <HomeContent />,
        },
        {
          path: 'home',
          element: <HomeContent header="Header" img={img1} title="Name" />,
        },
        {
          path: 'home/view-all(2)',
          element: <View2 />,
        },
        {
          path: 'home/view-all(1)',
          element: <View1 header="Header" img={img1} title="Name" />,
        },
        {
          path: 'home/song',
          element: <SongCard header="Header" img={img1} title="Name" />,
        },
        {
          path: 'home/album',
          element: <AlbumCard header="Header" img={img1} title="Name" />,
        },
        {
          path: 'home/profile',
          element: <Profile img={img1} />,
        },
        {
          path: 'search',
          element: <SearchContent header="Header" img={img1} title="Name" />,
        },
        {
          path: 'library',
          element: <LibraryContent header="Header" img={img1} title="Name" />,
        },
        {
          path: 'library/playlist',
          element: <Playlist handlePlayAllClick={handlePlayAllClick} handleSongClick={handleSongClick} />,
        },
        {
          path: 'callertune',
          element: <CallertuneContent header="Header" img={img1} title="Name" />,
        },
      ],
    },
  ];

  return (
    <DataContext.Provider value={IsDataContext}>
      <PhoneContext.Provider value={IsPhoneContext}>
        <Routes>
          {/* Redirect from root URL to the home page */}
          <Route path="/Main" element={<Navigate to="/Main/home" />} />

          {/* Iterate over your route configuration */}
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element}>
              {/* Render child routes */}
              {route.children &&
                route.children.map(childRoute => (
                  <Route
                    key={`${route.path}-${childRoute.path}`}
                    path={`${route.path}/${childRoute.path}`}
                    element={childRoute.element}
                  />
                ))}
            </Route>
          ))}
        </Routes>
      </PhoneContext.Provider>
    </DataContext.Provider>
  );
};

export default RouterPath;
