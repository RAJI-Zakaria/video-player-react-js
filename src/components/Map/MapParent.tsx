import { useState, useEffect } from 'react';
import LocationMarker from './LocationMarker.tsx';
import {Container} from "react-bootstrap";
import {MapContainer, TileLayer} from "react-leaflet";
import {Waypoint,MapParentProps} from "../Types.tsx";

const initialPosition : Waypoint = { lat: "48.7313", lng: "-3.4621", label: "Lannion", timestamp: "0" };

const MapParent = ({waypointsProp,currentDurationOfVideo}:MapParentProps) => {

    const waypoints = waypointsProp
    const [currentWaypoint, setCurrentWaypoint] = useState<Waypoint>(initialPosition);

    useEffect(() => {

        const currentWaypoint = waypoints // Sort the waypoints by timestamp and find the closest waypoint to the current time
            .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp))
            .reduce((closest, waypoint) => {

                const waypointTimestamp = parseInt(waypoint.timestamp);
                const closestTimestamp = parseInt(closest.timestamp);

                if (waypointTimestamp <= currentDurationOfVideo && waypointTimestamp >= closestTimestamp) {
                    return waypoint;
                }

                return closest;
            }, initialPosition); // Initialize with the default waypoint

        if (currentWaypoint) {
            setCurrentWaypoint(currentWaypoint);
        }

    }, [currentDurationOfVideo, waypoints]);

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