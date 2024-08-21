import React from 'react';
import { Link } from 'react-router-dom'; 
import './open.css';

const OpenComponent = () => {
  return (
      <div className="immersive-div">
        <h1>RESONATE</h1>
        <p>
          <strong>
            Immerse yourself in a world of rhythm and melody with our music app.
            <br />
            Discover new tunes, create playlists, and let the harmonies of life fill your soul
          </strong>  
        </p>
        <Link to="/login" className="button" id="mobile">
          Continue login using Mobile Number
        </Link>
        <p>OR</p>
        <Link to="/Main/home" className="button" id="try">
          Try it first
        </Link>
      </div> 
  );
};

export default OpenComponent;





