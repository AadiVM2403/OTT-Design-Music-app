import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./view-all(1).css";
import DataContext from './DataContext';

function AlbumCard() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const datavalue = useContext(DataContext);
    const [dataFetched, setDataFetched] = useState(false);
    const [album, setAlbum] = useState({});

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const i = queryParams.get('catIndex');
    const x = queryParams.get('slideIndex');

    const main = JSON.parse(localStorage.getItem('songData'));

    useEffect(() => {
        async function fetchData() {
            try {
                if (main.categories && main.categories[i] && main.categories[i].items && main.categories[i].items[x] && main.categories[i].items[x].mlink ) {
                    const mlink = main.categories[i].items[x].mlink;

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
    }, [dataFetched, datavalue, i, x, main]);


    useEffect(() => {
        const album = JSON.parse(localStorage.getItem('albumData'));
        async function fetchData() {
            try {
                if (album.categories && album.categories[x] && album.categories[x].mlink ) {
                    const mlink = album.categories[x].mlink;

                    const Response = await fetch(`https://aditi.ipadlive.com/mod_cms/api/apti.music.app.php?buildid=BUDDIEBEATZ&androidid=0717993a01f417ed&pl=HMD Global Nokia 5.4&ei=&cc=&mver=0000004&nc=&ims=&loc=&ver=APTINEW0010&apiver=0.3&country=ZWE&operator=ECONET&locale=en&lang=en&uniquecustomid=230506162135034&ui=mhyw88awx5pd436j&ckey=&dkey=27abqqmzmzk22dvc&ua=Mozilla/5.0 (Linux; Android 12; Nokia 5.4 Build/SKQ1.220119.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36&email=&sw=720&sh=1406&versioncode=35&referrer=utm_source=google-play&utm_medium=organic&referrerdt=06-May-2023&socialid=&conn=wifi&conntype=&invitecode=&subtype=null&cgr=0&promoparams=&phno=263784763448${mlink}`);

                    if (Response.ok) {
                        const ResponseData = await Response.json();
                        setAlbum(ResponseData);
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
    }, [dataFetched, x, main]);

    localStorage.setItem('albumSong', JSON.stringify(data));
    localStorage.setItem('morealbumSong', JSON.stringify(album));
    
    let Name;
    if (x <= 3) {
        Name = data?.categories?.[0]?.name;
    } else {
        Name = album?.categories?.[0]?.name;
    }

    function handleImageClick(i,x,index) {
        navigate(`/Main/home/song?catIndex=${i}&slideIndex=${x}&songIndex=${index}`);
    }
    
    return (
        <div className="New">
            <div className="bar">
                <div className='left'>
                    <span uk-icon="icon: chevron-left; ratio: 2" className="icon" onClick={handleBackButtonClick} style={{ cursor: 'pointer' }} />
                </div>
                <div className="page-name">{Name}</div>
                <div className='right'>
                    <span>&#8942;</span>
                </div>
            </div>
            <div className="basket" >
                {x <= 3 ? (
                    dataFetched && data?.categories?.[0]?.items?.map((item, index) => (
                        <div key={index} className="item" onClick={() => handleImageClick(i, x, index)} style={{ cursor: 'pointer' }} >
                            <img src={item.thumbnail} alt="damn"  />
                            <div className="img-name">{item.name}</div>
                        </div>
                    ))
                ) : (
                    dataFetched && album?.categories?.[0]?.items?.map((item, index) => (
                        <div key={index} className="item" onClick={() => handleImageClick(i, x, index)} style={{ cursor: 'pointer' }} >
                            <img src={item.thumbnail} alt="damn" />
                            <div className="img-name">{item.name}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default AlbumCard;