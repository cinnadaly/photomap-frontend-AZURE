import {APIProvider, Map, Marker, InfoWindow} from '@vis.gl/react-google-maps';
import React, {useState, useEffect} from 'react'
import '../components/HomeMap.css';
import '../components/Carousel.css';

export default function HomeMap(){
    const BASE_URL = 'http://localhost:5555';

    //for infoWindow selection
    const [selectedLocation, setSelectedLocation] = useState(null);

    //arrays for markers
    const [photos, setPhotos] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/photos`,{
            credentials: "include"
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            setPhotos(data.data)
        })
        .catch((err) => console.log(err))
    }, [])


    useEffect(() => {
        fetch(`${BASE_URL}/locations`,{
            credentials: "include"
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data);
            setLocations(data.data)
        })
        .catch((err) => console.log(err))
    }, [])


    //current position and first data
    const defaultCenter = navigator.geolocation.getCurrentPosition((position) => {
        //console.log(position.coords.latitude, position.coords.longitude)
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        return pos;
    })

    const [map, setMap] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setCurrentPosition(pos);
            },
            () => {
                console.error("Geolocation failed or permission denied.");
                setCurrentPosition(defaultCenter); 
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        } else {
            console.error("Browser doesn't support Geolocation.");
            setCurrentPosition(defaultCenter);
        }
    }, []); 

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    return (
        <div className='map-container'>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                {currentPosition && (
                    <>
                    <Map
                    style={{width: '100vw', height: '92vh'}}
                    defaultCenter={currentPosition}
                    defaultZoom={18}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    gestureHandling='greedy'
                    disableDefaultUI
                    />

                    <Marker position={currentPosition} />

                    {locations.map((location) => (
                        <Marker
                            key={location.id}
                            position={{
                            lat: Number(location.lat),
                            lng: Number(location.lng)
                            }}
                            onClick={async () => {
                                setSelectedLocation(location);
                                try {
                                    const response = await fetch(
                                    `${BASE_URL}/locations/${location.id}/photos`,
                                    {
                                        credentials: "include"
                                    });
                                    const data = await response.json();
                                    setPhotos(data.data);
                                    console.log(data);
                                } catch (error) {
                                    console.error("Error fetching photos:", error);
                                    setPhotos([]);
                                }
                            }}
                        />
                        ))}

                        {selectedLocation && (
                            <InfoWindow
                                position={{
                                lat: Number(selectedLocation.lat),
                                lng: Number(selectedLocation.lng)
                                }}
                                onCloseClick={() => setSelectedLocation(null)}
                            >
                                <div className="info-window">
                                    <div
                                        id="carouselExampleIndicators"
                                        className="carousel slide"
                                        data-bs-ride="carousel"
                                    >
                                        
                                        <div className="carousel-indicators">
                                            {console.log(photos)}
                                        {photos.map((photo, index) => (
                                            <button
                                            key={photo.id}
                                            type="button"
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide-to={index}
                                            className={index === 0 ? "active" : ""}
                                            />
                                        ))}
                                        </div>

                                        <div className="carousel-inner">
                                        {photos.map((photo, index) => (
                                            <div
                                            key={photo.id}
                                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                                            >
                                            <div
                                                style={{
                                                    backgroundImage: `url(${BASE_URL}/uploads/${photo.imagePath})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    height: "200px",
                                                    width: "100%"
                                                }}
                                                alt="location"
                                            />
                                            </div>
                                        ))}
                                        </div>
                                    </div>

                                    <h5>{selectedLocation.name}</h5>
                                    <p>{selectedLocation.address}</p>
                                    <p><strong>Lat:</strong> {selectedLocation.lat}</p>
                                    <p><strong>Lng:</strong> {selectedLocation.lng}</p>
                                </div>
                            </InfoWindow>
                        )}
                        
                    </>
                )}
            </APIProvider>
        </div>
    );
}
