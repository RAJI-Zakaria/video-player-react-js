import { useEffect, useState } from 'react';
import {Marker, Popup, Tooltip, useMap} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import {WaypointChild} from "../Types.tsx";


function LocationMarker({ lat, lng, label }: WaypointChild) {

    const [position, setPosition] = useState<LatLngExpression>({ lat, lng });
    const [markerLabel, setMarkerLabel] = useState<string>(label);

    const map = useMap();

    useEffect(() => {
        setPosition({ lat, lng });
        setMarkerLabel(label);
        map.flyTo({ lat, lng },13 /*map.getZoom()*/);
    }, [label, lat, lng, map]);

    return (
        <Marker position={position}>
            <Popup >{markerLabel}</Popup>
            <Tooltip>
                {markerLabel}
            </Tooltip>
        </Marker>
    );
}

export default LocationMarker;
