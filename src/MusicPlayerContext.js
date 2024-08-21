import React, { createContext, useContext, useState} from 'react';

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <MusicPlayerContext.Provider value={{ currentSong, setCurrentSong}}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('miniplayer not working');
  }
  return context;
};
