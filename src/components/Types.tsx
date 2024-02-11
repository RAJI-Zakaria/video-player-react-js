import {PopupOptions} from "leaflet";

export interface Film {
    file_url: string;
    synopsis_url: string;
    title: string;
  }
  
  export interface Chapter {
    pos: number;
    title: string;
  }
  

  export interface Tag {
    title: string;
    url: string;
  }
  
  export interface Keywords {
    pos: number;
    data: Tag[];
  }

  export interface film{
    file_url: string;
    synopsis_url: string;
    title: string;
  }

export interface Waypoint {
  lat: string;
  lng: string;
  label: string;
  timestamp: string;
  zoom: number;
}

export interface MapProps {
  waypointsProp: Waypoint[],
  currentDurationOfVideo: number,
  initialPosition: Waypoint,
  onMarkerClick: (time: number) => void
}


export interface PopupOptionsChildren extends PopupOptions{
  children: string;
}

export const isWaypoint = (waypoint: Waypoint | boolean): waypoint is Waypoint => {
  return Boolean(typeof waypoint === 'object' && waypoint.lat && waypoint.lng && waypoint.label && waypoint.timestamp && waypoint.zoom);
}