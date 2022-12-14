import React, { useState, useEffect, useRef } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useDispatch } from 'react-redux';
import { getGMapsAPIKey } from '../../store/session';

const containerStyle = {
    width: '400px',
    height: '400px'
};

function MapComponent({ apiKey }) {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 18
            }));
        }
    }, [ref, map]);


    return (
        <div ref={ref} id="map"></div>
    )
}

export default MapComponent
