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
}

export interface MapParentProps {
  waypointsProp: Waypoint[],
  currentDurationOfVideo: number
}

export interface WaypointChild {
  lat: number;
  lng: number;
  label: string;
}