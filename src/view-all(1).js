import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./view-all(1).css";
import DataContext from './DataContext';

function View1() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const datavalue = useContext(DataContext);
    const [dataFetched, setDataFetched] = useState(false);

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const i = queryParams.get('catIndex');

    const main = JSON.parse(localStorage.getItem('songData'));

    useEffect(() => {
        async function fetchData() {
            try {
                if (main.categories && main.categories[i] && main.categories[i].mlink) {
                    const mlink = main.categories[i].mlink;

                    const Response = await fetch(`https://aditi.ipadlive.com/mod_cms/api/apti.music.app.php?buildid=BUDDIEBEATZ&androidid=0717993a01f417ed&pl=HMD Global Nokia 5.4&ei=&cc=&mver=0000004&nc=&ims=&loc=&ver=APTINEW0010&apiver=0.3&country=ZWE&operator=ECONET&locale=en&lang=en&uniquecustomid=230506162135034&ui=mhyw88awx5pd436j&ckey=&dkey=27abqqmzmzk22dvc&ua=Mozilla/5.0 (Linux; Android 12; Nokia 5.4 Build/SKQ1.220119.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36&email=&sw=720&sh=1406&versioncode=35&referrer=utm_source=google-play&utm_medium=organic&referrerdt=06-May-2023&socialid=&conn=wifi&conntype=&invitecode=&subtype=null&cgr=0&promoparams=&phno=263784763448${mlink}`);

                    if (Response.ok) {
                        const ResponseData = await Response.json();
                        setData(ResponseData);
                        datavalue.setData(ResponseData);
                        setDataFetched(true);
                    } else {
                        console.error('Failed to fetch data from mlink:', Response.statusText);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        if (!dataFetched) {
            fetchData();
        }
    }, [dataFetched, datavalue, i, main]);

    localStorage.setItem('albumData', JSON.stringify(data));

    function handleImageClick(x) {
        navigate(`/Main/home/album?catIndex=${i}&slideIndex=${x}`);
    }

    return (
        <div className="New">
            <div className="bar">
                <div className='left'>
                    <span uk-icon="icon: chevron-left; ratio: 2" className="icon" onClick={handleBackButtonClick} style={{ cursor: 'pointer' }} />
                </div>
                {(main.categories && main.categories[i]) ?  (
                    <span className="page-name">{main.categories[i].name}</span>
                ) : (
                    <span className="page-name"></span>
                )}
                <div className='right'>
                    <span>&#8942;</span>
                </div>
            </div>
            <div className="basket">
                {data.categories && data.categories.length > 0 ? (
                    data.categories.map((category, x) => (
                        <div key={x} className="item">
                            <img src={category.thumbnail} alt='damn' onClick={() => handleImageClick(x)} style={{ cursor: 'pointer' }} />
                            <div className="img-name">{category.name}</div>
                        </div>
                        ))
                ) : (
                    <div/>
                )}
            </div>
        </div>
    )
}

export default View1;


