import React from 'react';
import './slider.css';

function SlideItem(props) {
    return (
        <li className="slide-item">
            <div className="image-container">
                <img className="cover" src={props.img} alt={props.title} onClick={props.onClick} />
                <span className="play-button uk-position-center-left uk-position-small" uk-hidden="true">
                    <span uk-icon="icon: play-circle; ratio: 2.5" ></span>
                </span>
            </div>
            <div className='Title'>{props.title}</div>
        </li>
    );
}

export default SlideItem;

