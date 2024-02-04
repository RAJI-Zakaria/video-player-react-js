// ParentComponent.tsx

import { useState, useEffect } from 'react';
import LocationMarker from './LocationMarker.tsx';
import {Container} from "react-bootstrap";
import {MapContainer, TileLayer} from "react-leaflet";



interface Waypoint {
    lat: string;
    lng: string;
    label: string;
    timestamp?: string;
}

interface MapParentProps {
    waypointsProp: Waypoint[]
}

const initialPosition : Waypoint = { lat: "48.7313", lng: "-3.4621", label: "Lannion" };

const MapParent = ({waypointsProp}:MapParentProps) => {
    const [waypoints, setWaypoints] = useState<Waypoint[]>(waypointsProp);
    const [currentWaypoint, setCurrentWaypoint] = useState<Waypoint>(initialPosition);

    useEffect(() => {
        console.log("Received waypointsProp:", waypointsProp);
        setWaypoints(waypointsProp);
        console.log("waypoints:", waypoints);
        // loop through waypointsProp and set the currentWaypoint and change wait 3 seconds
        // every 3 seconds, change the currentWaypoint from the waypoints
        let i = 0;
        const interval = setInterval(() => {
            setCurrentWaypoint(waypoints[i]);
            i = (i + 1) % waypoints.length;
        }, 3000);

        return () => clearInterval(interval);


    }, [waypointsProp]);

    return (
        <div>
            <Container>
                <MapContainer
                    center={{
                        lat: parseFloat(currentWaypoint.lat),
                        lng: parseFloat(currentWaypoint.lng)
                    }}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ minHeight: '400px', minWidth: '600px' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> redeemers'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker label={currentWaypoint.label}  lat={parseFloat(currentWaypoint.lat)} lng={parseFloat(currentWaypoint.lng)} />
                </MapContainer>
            </Container>
        </div>
    );
};

export default MapParent;
