import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

interface TimelineProgressBarProps {
  calculateProgress: () => number ;
  duration: number;
  currentDuration: number;
  timelineMarkers: Array<{ pos: number; title: string }>;
  onScrubStart: (e: React.MouseEvent<HTMLProgressElement>) => void;
  onScrubMove: (e: React.MouseEvent<HTMLProgressElement>) => void;
  onScrubEnd: () => void;
  onMarkerClick: (pos: number) => void;

}

const TimelineProgressBar: React.FC<TimelineProgressBarProps> = ({
  calculateProgress,
  duration,
  // currentDuration,
  timelineMarkers,
  onScrubStart,
  onScrubMove,
  onScrubEnd,
  onMarkerClick
}) => {
  return ( 
    <div style={{ position: 'relative' }}>
      <progress
        className='w-100'
        value={calculateProgress()}
        max='100'
        onMouseDown={onScrubStart}
        onMouseMove={onScrubMove}
        onMouseUp={onScrubEnd}
        style={{
          background: 'none',
        }}

      />
      {/* Display timeline Markers on hover */}
      {timelineMarkers.map((marker, index) => (
        <OverlayTrigger
          key={index}
          placement='top'
          overlay={<Popover className='bookmark' id={`popover-${index}`}>{marker.title}</Popover>}
        >
          <div
            className='marker-dot'
            style={{
              position: 'absolute',
              top: '0',
              left: `${(marker.pos / duration) * 100}%`,
              transform: 'translateX(-50%)',
              width: '5px',
              height: '20px',
              backgroundColor: '#ababab',
              cursor: 'pointer',
            }}
            onClick={() => onMarkerClick(marker.pos)} 
          />
        </OverlayTrigger>
      ))}
    </div>
  );
};

export default TimelineProgressBar;
