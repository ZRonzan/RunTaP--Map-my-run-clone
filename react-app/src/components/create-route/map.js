import { GoogleMap, useJsApiLoader, LoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getGMapsAPIKey } from '../../store/session';


const containerStyle = {
    width: "100%",
    height: "90%"
}

function MapComponent() {
    const [mapsKey, setMapsKey] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [clickedLocation, setClickedLocation] = useState(null)
    const [mouseLocation, setMouseLocation] = useState(["-","-"])

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

    const showLatLng = (event) => {
        console.log(event)
        console.log("lat:", event.latLng.lat())
        console.log("lng:", event.latLng.lng())
        setClickedLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        })
    }

    const showMouseLocation = (event) => {
        setMouseLocation([event.latLng.lat().toFixed(3), event.latLng.lng().toFixed(3)])
    }


    return isLoaded && (
        <LoadScript
            googleMapsApiKey={mapsKey}
        >
            <div>{`Lat: ${mouseLocation[0]}, Lng: ${mouseLocation[1]}`}</div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                center={center}
                zoom={13}
                onLoad={onLoad}
                onClick={showLatLng}
                onMouseMove={showMouseLocation}
            >
                <Marker
                position={clickedLocation}

                />
            </GoogleMap>
        </LoadScript>
    )
}

export default MapComponent
