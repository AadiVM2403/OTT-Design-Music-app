import React, { useEffect, useState,useContext } from 'react';
import UIkit from 'uikit';
import './home.css'; // Import your custom CSS
import Icons from 'uikit/dist/js/uikit-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SlideItem from './slider';
import DoubleSlideItem from './doubleslider';
import DataContext from './DataContext';

UIkit.use(Icons);

function HomeContent(props) {
    const { header, img, title} = props;
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const datavalue = useContext(DataContext);
    const [dataFetched, setDataFetched] = useState(false);
    const [SliderInitialized,setSliderInitialized] = useState(false);

    function openMenu() {
        navigate('/Main/home/profile');
    }
      
    useEffect(() => {
        const sliderItems = document.querySelectorAll('.custom-slider .uk-slider-items li');

        if (sliderItems.length > 0) {
            UIkit.slider('.custom-slider', {
                draggable: true,
                finite: true
            });
            setSliderInitialized(true);
        }
    },[SliderInitialized]);
    
        useEffect(() => {
            async function fetchData() {
                try {
                    const response = await fetch("https://aditi.ipadlive.com/mod_cms/api/apti.music.app.php?buildid=BUDDIEBEATZ&androidid=0717993a01f417ed&pl=HMD Global Nokia 5.4&ei=&cc=&mver=0000004&nc=&ims=&loc=&ver=APTINEW0010&apiver=0.3&country=ZWE&operator=ECONET&locale=en&lang=en&uniquecustomid=230506162135034&ui=mhyw88awx5pd436j&ckey=&dkey=27abqqmzmzk22dvc&ua=Mozilla/5.0 (Linux; Android 12; Nokia 5.4 Build/SKQ1.220119.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36&email=&sw=720&sh=1406&versioncode=35&referrer=utm_source=google-play&utm_medium=organic&referrerdt=06-May-2023&socialid=&conn=wifi&conntype=&invitecode=&subtype=null&cgr=0&promoparams=", {
                        method: 'POST',
                        body: JSON.stringify({
                            act: 'mget',
                            phno: 263784763448,
                        }),
                    });
        
                    if (response.ok) {
                        const responseData = await response.json();
                        
        
                        
                        if (responseData.tabs && responseData.tabs[0] && responseData.tabs[0].mlink) {
                            const mlink = responseData.tabs[0].mlink;
                            
                            
                            const secondResponse = await fetch(`https://aditi.ipadlive.com/mod_cms/api/apti.music.app.php?buildid=BUDDIEBEATZ&androidid=0717993a01f417ed&pl=HMD Global Nokia 5.4&ei=&cc=&mver=0000004&nc=&ims=&loc=&ver=APTINEW0010&apiver=0.3&country=ZWE&operator=ECONET&locale=en&lang=en&uniquecustomid=230506162135034&ui=mhyw88awx5pd436j&ckey=&dkey=27abqqmzmzk22dvc&ua=Mozilla/5.0 (Linux; Android 12; Nokia 5.4 Build/SKQ1.220119.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36&email=&sw=720&sh=1406&versioncode=35&referrer=utm_source=google-play&utm_medium=organic&referrerdt=06-May-2023&socialid=&conn=wifi&conntype=&invitecode=&subtype=null&cgr=0&promoparams=&phno=263784763448${mlink}`);
                            
                            if (secondResponse.ok) {
                                const secondResponseData = await secondResponse.json();
                                setData(secondResponseData);
                                datavalue.setData(secondResponseData);
                                setDataFetched(true);
                            } else {
                                console.error('Failed to fetch data from mlink:', secondResponse.statusText);
                            }
                        }
                    } else {
                        console.error('Failed to fetch data from response');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        
            if (!dataFetched) {
                fetchData();
            }
        }, [dataFetched, datavalue, data]);


    const numSlides = 4; // Define the number of slides

    const catInd = [0, 1, 2, 3, 4, 5];

    const slides = [0, 1, 2, 3];

    function handleImageClick(i, x) {
        if (i===0 || i===3 || i===4) {
            navigate(`/Main/home/song?catIndex=${i}&slideIndex=${x}`);
        }
        else {
            navigate(`/Main/home/album?catIndex=${i}&slideIndex=${x}`);
        }
    }
    
    // Store the entire data object in localStorage
    localStorage.setItem('songData', JSON.stringify(data));


    return (
        <div className="home">
            <div className='Main-bar'>
                <div className='Name'>RESONANCE</div>
                <div className='corner'>
                    <span uk-icon="icon: bell; ratio: 1.5" className="icon" />
                    <span uk-icon="icon: menu; ratio: 1.5" className="icon" onClick={openMenu} />
                </div>
            </div>
            {/* Map over the categoryIndices array to repeat the code block */}
            {catInd.map((categoryIndex, i) => (
                <React.Fragment key={categoryIndex}>
                    <div className='headers-wrapper'>
                    {/* Check if data.categories is an array before rendering */}
                    {Array.isArray(data.categories) && data.categories[i] && (
                        <div className="headers-wrapper">{data.categories[i].name}</div>
                    )}
                    <div className="headers-wrapper">
                        {/* Conditionally render the "View All" link for catInd[0] */}
                        {(i === 0 || i === 3 || i === 4)  ? (
                            <Link to={`/Main/home/view-all(2)?catIndex=${i}`} className="view-all-link">View All &gt;</Link>
                        ) : (i === 1 || i === 2 || i === 5) ? (
                            <Link to={`/Main/home/view-all(1)?catIndex=${i}`} className="view-all-link">View All &gt;</Link>
                        ) : (
                            <Link to="#" className="view-all-link">View All &gt;</Link>
                        )}
                    </div>
                    </div>
                    <div className={`custom-slider uk-position-relative uk-visible-toggle uk-light uk-slider`} tabIndex="-1" >
                    <ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid">
                    {slides.map((index, x) => {
                        // Check if data.categories[i] and data.categories[i].item[x] exist before rendering
                        if (
                            data.categories &&
                            Array.isArray(data.categories) &&
                            data.categories[i] &&
                            Array.isArray(data.categories[i].items) &&
                            data.categories[i].items[x]
                        ) {
                            
                            return (
                            <SlideItem
                                key={index}
                                img={data.categories[i].items[x].thumbnail}
                                title={data.categories[i].items[x].name}
                                onClick={() => handleImageClick(catInd[i],slides[x])}
                            />
                            );
                        } else {
                            return <div key={index}></div>;
                        }
                    })}

                    </ul>
                    </div>
                </React.Fragment>
            ))}


            <div className='headers-wrapper'>
                <div className="header-content">{header}</div>
                <div className="header-content"><Link to="#" className="view-all-link">View All &gt;</Link></div>
            </div>
            <div className={`custom-slider uk-position-relative uk-visible-toggle uk-light`} tabIndex="-1">
                <ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid">
                    {Array.from({ length: numSlides }, (_, index) => (
                        <DoubleSlideItem key={index} img={img} title={title} index={index} showLowerPart={true}/>
                    ))}
                </ul>
            </div>
            <div className='headers-wrapper'>
                <div className="header-content">{header}</div>
                <div className="header-content"><Link to="#" className="view-all-link">View All &gt;</Link></div>
            </div>
            <div className={`custom-slider uk-position-relative uk-visible-toggle uk-light`} tabIndex="-1">
                <ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid">
                    {Array.from({ length: numSlides }, (_, index) => (
                        <DoubleSlideItem key={index} img={img} title={title} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HomeContent;


