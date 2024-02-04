// App.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import MapParent from "./components/MapParent.tsx";

interface Waypoint {
    lat: string;
    lng: string;
    label: string;
    timestamp: string;
}

const App = () => {
    const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
    // const [currentTimestamp, setCurrentTimestamp] = useState<number>(45); // Replace with the actual current timestamp from the movie

    useEffect(() => {
        // Fetch waypoints data
        const fetchData = async () => {
            try {
                const { data } = await axios.get('https://imr3-react.herokuapp.com/backend');
                if (data?.Waypoints) {
                    setWaypoints(data.Waypoints);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <MapParent waypointsProp={waypoints} />
        </div>
    );
};

export default App;
