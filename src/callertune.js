import React, { useEffect } from 'react';
import UIkit from 'uikit';
import './callertune.css';
import SlideItem from './slider';
import { Link } from 'react-router-dom';


function CallertuneContent(props) {
    const { header, img, title } = props;
    
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
        <div className='callertune'>
            <div className='page'>Callertunes</div>
            <input
                type="text"
                placeholder="Artist, Songs or Callertunes"
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
            <div className={`custom-slider uk-position-relative uk-visible-toggle uk-light`} tabIndex="-1" uk-slider="true">
                <ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid">
                    {Array.from({ length: numSlides }, (_, index) => (
                        <SlideItem key={index} img={img} title={title} />
                    ))}
                </ul>
            </div>
        </div>  
    );
}

export default CallertuneContent;