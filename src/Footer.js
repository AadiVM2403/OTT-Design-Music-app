import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import UIkit from 'uikit'; // Import UIKit
import UIkitIcons from 'uikit/dist/js/uikit-icons'; // Import UIKit icons

// Initialize UIKit icons
UIkit.use(UIkitIcons);

function Footer({ initialClickedIcon }) {
    const [clickedIcon, setClickedIcon] = useState(initialClickedIcon);

    useEffect(() => {
        // You can call UIkit.update() to apply any dynamic updates after rendering
    }, [clickedIcon]);

    const handleIconClick = (icon) => {
        setClickedIcon(icon);
    };

    return (
        <div className="footer">
            <div className="footer-icon">
                <Link
                    to="/Main/home"
                    uk-icon="icon: home; ratio: 1.5"
                    className={`home-icon ${clickedIcon === 'home' ? 'clicked' : ''}`}
                    onClick={() => handleIconClick('home')}
                ></Link>
                <p className='icon'>Home</p>
            </div>
            <div className="footer-icon">
                <Link
                    to="/Main/search"
                    uk-icon="icon: search; ratio: 1.5"
                    className={`search-icon ${clickedIcon === 'search' ? 'clicked' : ''}`}
                    onClick={() => handleIconClick('search')}
                ></Link>
                <p className='icon'>Search</p>
            </div>
            <div className="footer-icon">
                <Link
                    to="/Main/library"
                    uk-icon="icon: album; ratio: 1.5"
                    className={`library-icon ${clickedIcon === 'library' ? 'clicked' : ''}`}
                    onClick={() => handleIconClick('library')}
                ></Link>
                <p className='icon'>Library</p>
            </div>
            <div className="footer-icon">
                <Link
                    to="/Main/callertune"
                    uk-icon="icon: receiver; ratio: 1.5"
                    className={`callertune-icon ${clickedIcon === 'callertune' ? 'clicked' : ''}`}
                    onClick={() => handleIconClick('callertune')}
                ></Link>
                <p className='icon'>Callertune</p>
            </div>
        </div>
    );
}

export default Footer;




