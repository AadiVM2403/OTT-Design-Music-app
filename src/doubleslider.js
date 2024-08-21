import React from 'react';
import UIkit from 'uikit';
import UIkitIcons from 'uikit/dist/js/uikit-icons';
import './doubleslider.css';

UIkit.use(UIkitIcons);

function DoubleSlideItem(props) {
    const playButtonClass = props.showLowerPart ? 'play-button upper' : 'play-button centered';

    return (
        <li className="slide-item">
            <div className="double-image-container">
                <div className="img">
                    <img className="cover-circle" src={props.img} alt={`Double Slide ${props.index + 1}`} />
                    <span className={playButtonClass} uk-hidden="true">
                        <span uk-icon="icon: play-circle; ratio: 2.5"></span>
                    </span>
                </div>
                <div className='Title'>{props.title}</div>
                {props.showLowerPart && (
                    <div className="img-block">
                        <img className="cover-circle" src={props.img} alt={`Double Slide ${props.index + 1}`} />
                        <span className="play-button lower" uk-hidden="true">
                            <span uk-icon="icon: play-circle; ratio: 2.5"></span>
                        </span>
                    </div>
                )}
                {props.showLowerPart && <div className='Title'>{props.title}</div>}
            </div>
        </li>
    );
}

export default DoubleSlideItem;


