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
    const [mouseLocation, setMouseLocation] = useState(["-", "-"])

    const [startChecked, setStartChecked] = useState(false)
    const [endChecked, setEndChecked] = useState(false)

    const [waypoints, setWaypoints] = useState([])

    const dispatch = useDispatch()

    const center = useMemo(() => ({ lat: 40.73, lng: -73.93 }), [])
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

    const addWaypoint = (event) => {
        console.log(event)
        console.log("lat:", event.latLng.lat())
        console.log("lng:", event.latLng.lng())
        waypoints.push({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        })
        setWaypoints(waypoints)
    }

    const showMouseLocation = (event) => {
        setMouseLocation([event.latLng.lat().toFixed(3), event.latLng.lng().toFixed(3)])
    }

    const deleteWaypoint = (index) => {
        waypoints.splice(index, 1)
        console.log(index)
        setWaypoints(waypoints)
    }


    return isLoaded && (
        <LoadScript
            googleMapsApiKey={mapsKey}
        >
            <div>
                {`Lat: ${mouseLocation[0]}, Lng: ${mouseLocation[1]}`}
            </div>
            {waypoints.length > 0 && (<div>
                <div>
                    {`Start: ${waypoints[0].lat.toFixed(2)}, ${waypoints[0].lng.toFixed(2)}`}
                </div>
                <div>
                    {`End: ${waypoints[waypoints.length - 1].lat.toFixed(2)}, ${waypoints[waypoints.length - 1].lng.toFixed(2)}`}
                </div>
            </div>)}
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                center={center}
                zoom={13}
                onLoad={onLoad}
                onClick={addWaypoint}
                onMouseMove={showMouseLocation}
            >
                {waypoints.length > 0 && (
                    waypoints.map((waypoint, i) => {

                        return (
                            <Marker
                                key={i}
                                position={waypoint}
                                icon={i != 0 && i != waypoints.length - 1 ? {
                                    path:
                                        "M 4 -9 l -4 9 L -4 -9 L 0 -12 z",
                                    fillColor: "red",
                                    fillOpacity: 0.9,
                                    scale: 2,
                                    strokeColor: "black",
                                    strokeWeight: 1,
                                } : {
                                    path:
                                        "M 4 -9 l -4 9 L -4 -9 L 0 -4 z",
                                    fillColor: "black",
                                    fillOpacity: 0.9,
                                    scale: 4,
                                    strokeColor: "red",
                                    strokeWeight: 1,
                                }}
                                className={`${i === 0 ? "waypoint start" : i === waypoints.length - 1 ? "waypoint end" : "waypoint intermediate"}`}
                                onClick={() => {
                                    deleteWaypoint(i)
                                }}
                            />
                        )
                    })
                )}
            </GoogleMap>
        </LoadScript>
    )
}

export default MapComponent
