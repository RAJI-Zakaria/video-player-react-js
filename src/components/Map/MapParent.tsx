import LocationMarker from './LocationMarker.tsx';
import {Container} from "react-bootstrap";
import {MapContainer, TileLayer} from "react-leaflet";
import {MapProps} from "../Types.tsx";
import './index.css';

const MapParent = ({ waypointsProp, currentDurationOfVideo,initialPosition, onMarkerClick }:MapProps) => {

    return (
        <div>
            <Container className="p-0">
                <MapContainer
                    center={{
                        lat: parseFloat(initialPosition.lat),
                        lng: parseFloat(initialPosition.lng)
                    }}
                    zoom={5}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> redeemers'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker initialPosition={initialPosition}  waypointsProp={waypointsProp} currentDurationOfVideo={currentDurationOfVideo} onMarkerClick={onMarkerClick}/>
                </MapContainer>
            </Container>
        </div>
    );
};

export default MapParent;