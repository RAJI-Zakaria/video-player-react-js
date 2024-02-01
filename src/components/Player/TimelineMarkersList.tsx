import React, { useEffect, useRef } from 'react';

interface TimelineMarker {
  time: number;
  title: string;
}

interface TimelineMarkersListProps {
  markers: TimelineMarker[];
  currentMarker: number;
  onMarkerClick: (time: number) => void;
}

const TimelineMarkersList: React.FC<TimelineMarkersListProps> = ({ markers, currentMarker, onMarkerClick }) => {
  const activeMarkerRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // Scroll to the active marker when the component renders
    if (activeMarkerRef.current) {
      activeMarkerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentMarker]);

  return (
    <div className="mt-2">
      <h4 className='text-white mb-4'>Timeline Markers</h4>
      <ul className="list-group" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {markers.map((marker, index) => (
          <li
            key={`${marker.title}_${index}`}
            ref={index === currentMarker ? activeMarkerRef : null}
            className={`list-group-item ${index === currentMarker ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => onMarkerClick(marker.time)} 
          >
            {`${marker.title} at ${marker.time} seconds`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineMarkersList;
