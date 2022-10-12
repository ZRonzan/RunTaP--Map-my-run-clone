import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { getGMapsAPIKey } from '../../store/session';

import './create-route.css'
import MapComponent from './map';

const CreateRoutePage = () => {
    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false);
    const [mapsKey, setMapsKey] = useState("");

    useEffect(() => {
        const getMaps = async () => {
            let mapsKey = await dispatch(getGMapsAPIKey())
            setMapsKey(mapsKey.key)
            setIsLoaded(true)
        }
        getMaps()
    },[])


    return isLoaded && (
        <div className='create-route-global-container'>
            <div className='create-route-sidebar'>
                LEFT
            </div>
            <div className='create-route-main-body-container'>
                <div className='create-route-map-window'>
                    <Wrapper apiKey={mapsKey}>
                        <MapComponent apiKey={mapsKey} />
                    </Wrapper>
                </div>
            </div>
        </div>
    );
};

export default CreateRoutePage;
