import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, OverlayTrigger, Popover, Row } from 'react-bootstrap';

const Player: React.FC = () => {
  const [volumeOfVideo, setVolumeOfVideo] = useState(100);
  const [durationOfVideo, setDurationOfVideo] = useState(0);
  const [currentDurationOfVideo, setCurrentDurationOfVideo] = useState(0);
  const [currentMarker, setCurrentMarker] = useState(0);
  const [timelineMarkers, setTimelineMarkers] = useState<Array<{ time: number; title: string }>>([

    { time: 1, title: 'start' },
    { time: 1.5, title: 'Break' },
    { time: 1.6, title: 'Break' },
    { time: 4, title: 'fdsaf' },
    { time: 5, title: '434r4r' },
    { time: 7, title: 't544433' },

    
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const getDurationOfVideo = () => {
    const updateTimeline = () => {
      if (videoRef.current) {
        setCurrentDurationOfVideo(videoRef.current.currentTime);
  
        if (videoRef.current.currentTime >= durationOfVideo) {
          clearVideoInterval();
        }
  
        // Check if the current time is between two timeline markers
        const activeMarker = timelineMarkers.find(
          (marker, index) =>
            videoRef.current.currentTime >= marker.time &&
            (index === timelineMarkers.length - 1 || videoRef.current.currentTime < timelineMarkers[index + 1].time)
        );
  
        if (activeMarker) {
          console.log(`Reached marker at ${activeMarker.time} seconds: ${activeMarker.title}`);
          const markerIndex = timelineMarkers.indexOf(activeMarker);
          console.log("_____" + markerIndex);
          setCurrentMarker(markerIndex);
        }
      }
  
      requestAnimationFrame(updateTimeline);
    };
  
    const clearVideoInterval = () => {
      cancelAnimationFrame(animationFrameId);
    };
  
    const animationFrameId = requestAnimationFrame(updateTimeline);
  };

  const volumeBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(e.target.value) / 100;
    setVolumeOfVideo(e.target.value);

    if (videoRef.current) {
      videoRef.current.volume = volumeValue.toFixed(1);
    }
  };


  const videoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setDurationOfVideo(videoRef.current.duration);
      getDurationOfVideo();
    }
  };

  const videoStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const videoReplay = () => {
    if (videoRef.current) {
      setDurationOfVideo(videoRef.current.duration);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      getDurationOfVideo();
    }
  };

  const videoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  const videoUnMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  

  const calculateProgress = () => {
    return (currentDurationOfVideo / durationOfVideo) * 100;
  };



  const [isScrubbing, setIsScrubbing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLProgressElement>) => {
    setIsScrubbing(true);
    handleScrub(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLProgressElement>) => {
    if (isScrubbing) {
      handleScrub(e);
    }
  };

  const handleMouseUp = () => {
    setIsScrubbing(false);
  };

  const handleScrub = (e: React.MouseEvent<HTMLProgressElement>) => {
    const progressBar = e.currentTarget;
    const newPosition = e.nativeEvent.offsetX / progressBar.clientWidth;
    const newTime = newPosition * durationOfVideo;

    setCurrentDurationOfVideo(newTime);

    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };


  return (
    <Container>
    
      <Row>
      <Col className="mt-4">
        <h4 className='text-white'>Timerrline Markers</h4>
        <ul className="list-group">
        {timelineMarkers.map((marker, index) => (
          <li
            key={`${marker.title}_${index}`}
            className={`list-group-item ${index === currentMarker ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            {`${marker.title} at ${marker.time} seconds`}
          </li>
        ))}

        </ul>
      </Col>

      <Col xl={12}>
        <video className='w-100' ref={videoRef} preload='auto'>
          <source src='https://www.w3schools.com/html/mov_bbb.mp4' type='video/mp4'></source>
        </video>
      </Col>
      </Row>

      <Row>
        <Col>
          <div style={{ position: 'relative' }}>
          
            <progress
              className='w-100'
              value={calculateProgress()}
              max='100'
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            style={{
              background:'red'
            }}
            />

            {/* Display timeline Markers on hover */}
            {timelineMarkers.map((marker, index) => (
              <OverlayTrigger
                key={index}
                placement='top'
                overlay={<Popover id={`popover-${index}`}>{marker.title}</Popover>}
              >
                <div
                  className='marker-dot'
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: `${(marker.time / durationOfVideo) * 100}%`,
                    transform: 'translateX(-50%)',
                    width: '5px',
                    height: '20px',
                    backgroundColor: '#ababab',
                    cursor: 'pointer',
                  }}
                />
              </OverlayTrigger>
            ))}
        </div>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex flex-wrap align-items-center">
          <button className="me-2" onClick={videoPlay}>Play</button>
          <button className="me-2" onClick={videoStop}>Stop</button>
          <button className="me-2" onClick={videoReplay}>Replay</button>
          <button className="me-2" onClick={videoMute}>Mute</button>
          <button className="me-2" onClick={videoUnMute}>Unmute</button>
          <label className="me-2">
            <b>Volume</b>
          </label>
          <input type='range' min='0' max='100' step='10' value={volumeOfVideo} onChange={volumeBar} />
        </Col>
      </Row>

    </Container>
  );
};

export default Player;
