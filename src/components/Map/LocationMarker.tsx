import { useEffect, useState } from 'react';
import {Marker, Popup, Tooltip, useMap, useMapEvents} from 'react-leaflet';
import {MapProps, Waypoint} from "../Types.tsx";

function LocationMarker({ waypointsProp,currentDurationOfVideo,initialPosition, onMarkerClick }:MapProps) {

    const [lastCurrentWaypoint, setLastCurrentWaypoint] = useState(initialPosition)

    const map = useMap();

    useMapEvents({
        click() {
            map.flyTo({ lat: parseFloat(initialPosition.lat), lng: parseFloat(initialPosition.lng) }, initialPosition.zoom);
        },
    })

    useEffect(() => {

        const currentWaypoint = waypointsProp // Sort the waypoints by timestamp and find the closest waypoint to the current time
            .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp))
            .reduce((closest, waypoint) => {

                const waypointTimestamp = parseInt(waypoint.timestamp);
                const closestTimestamp = parseInt(closest.timestamp);

                if (waypointTimestamp <= currentDurationOfVideo && waypointTimestamp >= closestTimestamp) {
                    return waypoint;
                }

                return closest;
            }, initialPosition); // Initialize with the default waypoint


        if (currentWaypoint && (currentWaypoint.label !== lastCurrentWaypoint.label)) {
            map.flyTo({ lat: parseFloat(currentWaypoint.lat), lng: parseFloat(currentWaypoint.lng) }, currentWaypoint.zoom);
            setLastCurrentWaypoint(currentWaypoint)
        }



    }, [currentDurationOfVideo, waypointsProp]);



    useMapEvents({
        popupopen(e) {
            const clickedWaypoint = getWaypointByLabel(e.popup.options.children)
            if (clickedWaypoint) {
                onMarkerClick(parseInt(clickedWaypoint.timestamp))
                map.flyTo({ lat: parseFloat(clickedWaypoint.lat), lng: parseFloat(clickedWaypoint.lng) }, clickedWaypoint.zoom);
            }else {
                alert("No timestamp found for this waypoint")
            }
        },
    })


    const getWaypointByLabel = (label:string): Waypoint | boolean => {
        const waypoint = waypointsProp.find(waypoint => waypoint.label === label)
        return waypoint ? waypoint : false
    }

    return (
        <>

            {waypointsProp.map((waypoint:Waypoint,index:number) => {
                return (
                    <Marker key={index} position={{lat:parseFloat(waypoint.lat),lng:parseFloat(waypoint.lng)}}>
                        <Popup>{waypoint.label}</Popup>
                        <Tooltip>
                            Click to jump to {waypoint.label} in the video
                        </Tooltip>
                    </Marker>
                )
            })}

        </>

    );
}

export default LocationMarker;
