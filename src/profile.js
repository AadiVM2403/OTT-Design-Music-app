import React, { useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faUser, faEnvelope, faBell, faInfo, faClipboard, faQuestion, faFolderOpen, faThumbsUp, faStar, faComments } from '@fortawesome/free-solid-svg-icons'
import './profile.css';

const iconArray = [faInfo, faClipboard, faQuestion, faStar, faComments, faFolderOpen, faEnvelope];

function Profile(props) {
    const { img } = props;
    const [dropdownStates, setDropdownStates] = useState({});
    const dropdownRefs = useRef({});
    const contentRefs = useRef({});
    
    const data = JSON.parse(localStorage.getItem('songData'));
    
    const toggleDropdown = (dropdownId) => {
        setDropdownStates({
            ...dropdownStates,
            [dropdownId]: !dropdownStates[dropdownId],
        });
    };
    
    useEffect(() => {
        for (const dropdownId in dropdownRefs.current) {
            const dropdownContent = dropdownRefs.current[dropdownId];
            const content = contentRefs.current[dropdownId];

            if (dropdownStates[dropdownId]) {
                dropdownContent.style.maxHeight = `${dropdownContent.scrollHeight}px`;
                dropdownContent.style.opacity = '1';
                
                // Adjust the margin-top of the content below the open dropdown
                content.style.marginTop = `${dropdownContent.scrollHeight}px`;
            } else {
                dropdownContent.style.maxHeight = '0';
                dropdownContent.style.opacity = '0';

                // Reset the margin-top of the content when the dropdown is closed
                content.style.marginTop = '0';
            }
        }
    }, [dropdownStates]);

    return (
        <div className='Menu'>
            <Link to="/Main/home" className="back">&lt;</Link>
            <div className='Profile'>
                <img src={img} alt='me' />
                <div className='tab'>
                    <div className='about-me'>
                        <div className='hi'>Hello, Aaditya Menon</div>
                        <div className='my-profile'>View Profile</div>
                        <div className='free'>Free User</div>
                    </div>
                    <Link to="#" className="more">{'>'}</Link>
                </div>
            </div>
            <div className="Menu-type">Account</div>
            <div className='stand'>
                {data.menu && data.menu.length > 0 && (
                    <div className="custom-dropdown">
                        <button
                        className="custom-button"
                        type="button"
                        onClick={() => toggleDropdown('dropdown1')}
                        >
                        {data.menu[0].text}
                        </button>
                        <div
                        className="dropdown-content"
                        ref={(ref) => (dropdownRefs.current['dropdown1'] = ref)}
                        >
                        <ul className="dropdown-list">
                            {data.menu[0].items.map((item, index) => (
                            <li key={index}>
                                <FontAwesomeIcon icon={faMusic} />
                                <Link to="#">{item.text}</Link>
                                <span className="arrow">&gt;</span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                )}
                <div className="content" ref={(ref) => (contentRefs.current['dropdown1'] = ref)}/>

                {data.menu && data.menu.length > 1 && data.menu[1].items && data.menu[1].items.length > 0 && (
                    <div className="custom-dropdown">
                        <button
                            className="custom-button"
                            type="button"
                            onClick={() => toggleDropdown('dropdown2')}
                        >
                            {data.menu[1].text}
                        </button>
                        <div
                            className="dropdown-content"
                            ref={(ref) => (dropdownRefs.current['dropdown2'] = ref)}
                        >
                            <ul className="dropdown-list">
                                <li>
                                    <FontAwesomeIcon icon={faMusic} />
                                    <Link to="#">{data.menu[1].items[0].text}</Link>
                                    <span className="arrow">&gt;</span>
                                </li>  
                            </ul>
                        </div>
                    </div>
                )}
                <div className="content" ref={(ref) => (contentRefs.current['dropdown2'] = ref)}/>

                {data.menu && data.menu.length > 2 && data.menu[2].items && data.menu[2].items.length > 0 && (
                    <div className="custom-dropdown">
                        <button
                            className="custom-button"
                            type="button"
                            onClick={() => toggleDropdown('dropdown3')}
                        >
                            {data.menu[2].text}
                        </button>
                        <div
                            className="dropdown-content"
                            ref={(ref) => (dropdownRefs.current['dropdown3'] = ref)}
                        >
                            <ul className="dropdown-list">
                                <li>
                                    <FontAwesomeIcon icon={faUser} />
                                    <Link to="#">{data.menu[2].items[0].text}</Link>
                                    <span className="arrow">&gt;</span>
                                </li>  
                            </ul>
                        </div>
                    </div>
                )}
                <div className="content" ref={(ref) => (contentRefs.current['dropdown3'] = ref)}/>

                {data.menu && data.menu.length > 3 && data.menu[3].items && data.menu[3].items.length > 0 && (
                    <div className="custom-dropdown">
                        <button
                            className="custom-button"
                            type="button"
                            onClick={() => toggleDropdown('dropdown4')}
                        >
                            {data.menu[3].text}
                        </button>
                        <div
                            className="dropdown-content"
                            ref={(ref) => (dropdownRefs.current['dropdown4'] = ref)}
                        >
                            <ul className="dropdown-list">
                                <li>
                                    <FontAwesomeIcon icon={faBell} />
                                    <Link to="#">{data.menu[3].items[0].text}</Link>
                                    <span className="arrow">&gt;</span>
                                </li>  
                            </ul>
                        </div>
                    </div>
                )}
                <div className="content" ref={(ref) => (contentRefs.current['dropdown4'] = ref)}/>

                <div className="custom-dropdown">
                    <button
                        className="custom-button"
                        type="button"
                        onClick={() => toggleDropdown('dropdown5')}
                    >
                        {data.menu && data.menu[4] ? data.menu[4].text : ''}
                    </button>
                    {data.menu && data.menu[4] && (
                        <div
                        className="dropdown-content"
                        ref={(ref) => (dropdownRefs.current['dropdown5'] = ref)}
                        >
                        <ul className="dropdown-list">
                        {data.menu[4].items.map((item, index) => (
                            <li key={index}>
                                {iconArray[index] && (
                                    <FontAwesomeIcon icon={iconArray[index]} />
                                )}
                                <Link to="#">{item.text}</Link>
                                <span className="arrow">&gt;</span>
                            </li>
                        ))}
                    </ul>
                        </div>
                    )}
                </div>
                <div className="content" ref={(ref) => (contentRefs.current['dropdown5'] = ref)}/>
    
                {data.menu && data.menu.length > 5 && data.menu[5].items && data.menu[5].items.length > 0 && (
                    <div className="custom-dropdown">
                        <button
                            className="custom-button"
                            type="button"
                            onClick={() => toggleDropdown('dropdown6')}
                        >
                            {data.menu[5].text}
                        </button>
                        <div
                            className="dropdown-content"
                            ref={(ref) => (dropdownRefs.current['dropdown6'] = ref)}
                        >
                            <ul className="dropdown-list">
                                <li>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                    <Link to="#">{data.menu[5].items[0].text}</Link>
                                    <span className="arrow">&gt;</span>
                                </li>  
                            </ul>
                        </div>
                    </div>
                )}
                <div className="content" ref={(ref) => (contentRefs.current['dropdown6'] = ref)}/>    
            </div>

            <div className="Menu-type">Settings</div>
            <div className='stand'>
                <div className="custom-dropdown">
                    <button
                        className="custom-button"
                        type="button"
                        onClick={() => toggleDropdown('dropdown7')}
                    >
                        General Settings
                    </button>
                    <div
                        className="dropdown-content"
                        ref={(ref) => (dropdownRefs.current['dropdown7'] = ref)}
                    >
                        <ul className="dropdown-list">
                            <li>
                                <Link to="#">Notification Settings</Link>
                                <span className="arrow">&gt;</span>
                            </li>
                            <li>
                                <Link to="#">App Language</Link>
                                <span className="arrow">&gt;</span>
                            </li>          
                        </ul>
                    </div>
                </div>

                <div className="content" ref={(ref) => (contentRefs.current['dropdown7'] = ref)}/>

                <div className="custom-dropdown">
                    <button
                        className="custom-button"
                        type="button"
                        onClick={() => toggleDropdown('dropdown8')}
                    >
                        Music Playback Settings
                    </button>
                    <div
                        className="dropdown-content"
                        ref={(ref) => (dropdownRefs.current['dropdown8'] = ref)}
                    >
                        <ul className="dropdown-list">
                            <li>
                                <Link to="#">Autoplay</Link>
                                <span className="arrow">&gt;</span>
                            </li>
                            <li>
                                <Link to="#">Audio Quality</Link>
                                <span className="arrow">&gt;</span>
                            </li>          
                        </ul>
                    </div>
                </div>

                <div className="content" ref={(ref) => (contentRefs.current['dropdown8'] = ref)}/>

                <div className="custom-dropdown">
                    <button
                        className="custom-button"
                        type="button"
                        onClick={() => toggleDropdown('dropdown9')}
                    >
                        Downloads
                    </button>
                    <div
                        className="dropdown-content"
                        ref={(ref) => (dropdownRefs.current['dropdown9'] = ref)}
                    >
                        <ul className="dropdown-list">
                            <li>
                                <Link to="#">Download on Cellular</Link>
                                <span className="arrow">&gt;</span>
                            </li>
                            <li>
                                <Link to="#">Music Download</Link>
                                <span className="arrow">&gt;</span>
                                </li>          
                        </ul>
                    </div>
                </div>

                <div className="content" ref={(ref) => (contentRefs.current['dropdown9'] = ref)}/>
            </div>
            <div className="Menu-type">General</div>
            <div className='stand'>
                <div className="custom-dropdown">
                    <button
                        className="straight"
                        type="button"
                    >
                        <Link to="#">About Econet</Link>
                        <span className="arrow">&gt;</span>
                    </button>
                    <button
                        className="straight"
                        type="button"
                    >
                        <Link to="#">Terms & Conditions</Link>
                        <span className="arrow">&gt;</span>
                    </button>
                    <button
                        className="straight"
                        type="button"
                    >
                        <Link to="#">Help/FAQ</Link>
                        <span className="arrow">&gt;</span>
                    </button>
                    <button
                        className="straight"
                        type="button"
                    >
                        <Link to="#">Rate Our App</Link>
                        <span className="arrow">&gt;</span>
                    </button>
                    <button
                        className="straight"
                        type="button"
                    >
                        <Link to="#">Feedback/Support</Link>
                        <span className="arrow">&gt;</span>
                    </button>
                    <button
                        className="straight"
                        type="button"
                    >
                        <Link to="#" className='red'>Delete your Account</Link>
                        <span className="arrow">&gt;</span>
                    </button>
                    <button
                        className="straight"
                        type="button"
                    >
                        <Link to="#" className='red'>Log out</Link>
                        <span className="arrow">&gt;</span>
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default Profile;







