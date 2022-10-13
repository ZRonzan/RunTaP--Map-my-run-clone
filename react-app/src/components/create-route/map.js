import { GoogleMap, useJsApiLoader, LoadScript } from '@react-google-maps/api';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getGMapsAPIKey } from '../../store/session';


const containerStyle = {
    width: "100%",
    height: "100%"
}

function MapComponent() {
    const [mapsKey, setMapsKey] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch()

    const center = useMemo(() => ({lat: 40.73, lng: -73.93}), [])
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false
    }))

    const mapRef = useRef()

    useEffect(() => {
        const getMaps = async () => {
            let mapsKey = await dispatch(getGMapsAPIKey())
            setMapsKey(mapsKey.key)
            setIsLoaded(true)
        }
        getMaps()
    }, [])

    const onLoad = useCallback((map) => {
        mapRef.current = map
    }, [])


    return isLoaded && (
        <LoadScript
            googleMapsApiKey={mapsKey}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                center={center}
                zoom={13}
                onLoad={onLoad}
            >

            </GoogleMap>
        </LoadScript>
    )
}

export default MapComponent
