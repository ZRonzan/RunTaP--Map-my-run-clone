import React, { useState, useEffect, useRef } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useDispatch } from 'react-redux';

function MapComponent({ apiKey }) {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: { lat: 40.73, lng: -73.93 },
                zoom: 13
            }));
        }
    }, [ref, map]);


    return (
        <div ref={ref} id="map">

        </div>
    )
}

export default MapComponent
