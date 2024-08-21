import React, { useEffect } from 'react';
import UIkit from 'uikit';
import UIkitIcons from 'uikit/dist/js/uikit-icons';
import './search.css';
import { Link } from 'react-router-dom';
import SlideItem from './slider';
import img1 from './img2.png';

UIkit.use(UIkitIcons);

function SearchContent(props) {
    const { header, img, title } = props;
    const colors = ['violet', 'red', 'purple', 'orange', 'green', 'blue'];
    useEffect(() => {
        const sliderItems = document.querySelectorAll('.custom-slider .uk-slider-items li');
    
        if (sliderItems.length > 0) {
            UIkit.slider('.custom-slider', {
                draggable: true,
                finite: true
            });
        }
    }, []);
    
    const numSlides = 4;

    return (
        <div className="search">
            <div className="mic-icon-container">
                <div className="mic-circle">
                    <span uk-icon="icon: microphone; ratio: 3"></span>
                </div>
            </div>
            <div className="find">Find Song</div>
            <input
                type="text"
                placeholder="Search"
                autoComplete="off"
                className='searchtab'
            />
            <div className='headers-wrapper' >
                <div className="header-content">{header}</div>
                <div className="header-content"><Link to="#" className="view-all-link">View All &gt;</Link></div>
            </div>
            <div className={`custom-slider uk-position-relative uk-visible-toggle uk-light`} tabIndex="-1" uk-slider="true">
                <ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid">
                    {Array.from({ length: numSlides }, (_, index) => (
                        <SlideItem key={index} img={img} title={title} />
                    ))}
                </ul>
            </div>
            <div className='headers-wrapper' >
                <div className="header-content">{header}</div>
                <div className="header-content"><Link to="#" className="view-all-link">View All &gt;</Link></div>
            </div>
            <div className="colored-blocks-container">
                <div className="column">
                    {colors.slice(0, 3).map((color, index) => (
                        <div
                            key={index}
                            className="colored-block"
                            style={{ backgroundColor: color }}
                        >
                            <img
                                src={img1}// Replace with the actual URL of your image
                                alt="The Weeknd"
                            />
                            <div className="text">Name</div>
                        </div>
                       
                    ))}
                </div>
                <div className="column">
                    {colors.slice(3).map((color, index) => (
                        <div
                            key={index + 3} // Offset key to avoid duplicates
                            className="colored-block"
                            style={{ backgroundColor: color }}
                        >
                            <img
                                src={img1}// Replace with the actual URL of your image
                                alt="The Weeknd"
                            />
                            <div className="text">Name</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchContent;
