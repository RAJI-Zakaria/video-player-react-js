import React, {  useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TimelineMarkersList from '../Marker/TimelineMarkersList.tsx';
import VideoPlayer from './VideoPlayer.tsx';
import VideoControls from './VideoControls.tsx';
import TimelineProgressBar from './TimelineProgressBar.tsx';

import {getFilm} from '../../api/film.js'

import LoadingAnimation from '../animation/LoadingAnimation.tsx';
import Tags from '../Tags/Tags.tsx';

import {Film, Chapter, Keywords, Waypoint} from '../Types.tsx'
import MapParent from "../Map/MapParent.tsx";

import ChatRoom from '../chatroom';


const Player: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [film, setFilm] = useState<Film>();
  const [keywords, setKeywords] = useState<Array<Keywords>>([]);
  const [volumeOfVideo, setVolumeOfVideo] = useState(100);
  const [durationOfVideo, setDurationOfVideo] = useState(0);
  const [currentDurationOfVideo, setCurrentDurationOfVideo] = useState(0);
  const [currentMarker, setCurrentMarker] = useState(0);
  const [timelineMarkers, setTimelineMarkers] = useState<Array<Chapter>>([]);

  const initialPosition : Waypoint = { lat: "37.76491527993864", lng: "-96.57680039688972", label: "", timestamp: "0",zoom: 5};

  useEffect(()=>{
    const fetchFilm = async () => {
      setLoading(true);
      try {
        const film = await getFilm();

        if(film.ok){
          setFilm(film.data.Film)
          setTimelineMarkers(film.data.Chapters)
          setWaypoints(film.data.Waypoints.map((waypoint: Waypoint) => {
            return {...waypoint, zoom: 13}
          }))
          setKeywords(film.data.Keywords)
        }else{
          alert('Error fetching Film')
        }
      } catch (error) {
        console.error('Error fetching Film :', error);
      }

      //just for testing purpose and to show animation 
      setTimeout(()=>setLoading(false), 2000)
    };


    fetchFilm();

    //i am fetching data from the api
   

    //INFO : I am using this part to load display all bookmarks on the timeline
    //TODO : Find a solution to force displaying bookmarks on the timeline 
    // setTimeout(() => {
    //   videoPlay()
    //   videoStop()
    // }, 1000);
  }, [])
  
//useEffect for durationOfVideo
  useEffect(() => {
    getDurationOfVideo(); // this will activate the markers behavior auto selection when the video is loaded and then click on a marker
  }
  , [durationOfVideo]);


  const videoRef = useRef<HTMLVideoElement>(null);
  
  
  const getDurationOfVideo = () => {
    const updateTimeline = () => {
      if (videoRef.current) {
        setCurrentDurationOfVideo(videoRef.current.currentTime);

        if (videoRef.current.currentTime >= durationOfVideo) {
          clearVideoInterval();
        }

        //INFO : i am using the following ode inside 2 components to display the markers on the timeline and show markers list
        const activeMarker = timelineMarkers.find(
          (marker, index) =>
          videoRef.current && videoRef.current.currentTime >= marker.pos &&
            (index === timelineMarkers.length - 1 || videoRef.current?.currentTime < timelineMarkers[index + 1].pos)
        );

        if (activeMarker) {
          // console.log(`Reached marker at ${activeMarker.pos} seconds: ${activeMarker.title}`);
          const markerIndex = timelineMarkers.indexOf(activeMarker);
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
    setVolumeOfVideo(parseFloat(e.target.value));

    if (videoRef.current) {
      videoRef.current.volume = parseFloat(volumeValue.toFixed(1));
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
    if (durationOfVideo > 0) {
      return (currentDurationOfVideo / durationOfVideo) * 100;
    } else {
      return 0;
    }
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

  const handleMarkerClick = (pos: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = pos;
      setCurrentDurationOfVideo(pos);
      videoRef.current.play(); // Optionally start playing after setting the pos
    }
  };

  const onMarkerClick = (time: number) => {
    if (videoRef.current) {
      if (time <= durationOfVideo) {
        // Set the video's current time
        videoRef.current.currentTime = time;
      } else {
        alert("Time exceeds video duration or the video has not been loaded yet.");
      }
    }
  }
 


  const handleTimeClick = (time: string) => {
    console.log(time);
    if (videoRef.current) {
      let totalSeconds = 0;
  
      // Split the time string into parts based on ":"
      const timeParts = time.split(":");
  
      // Parse hours, minutes, and seconds based on the length of timeParts array
      if (timeParts.length === 2) {
        // Format: "HH:mm"
        const [hours, minutes] = timeParts.map(Number);
        totalSeconds = hours * 3600 + minutes * 60;
      } else if (timeParts.length === 3) {
        // Format: "HH:mm:ss"
        const [hours, minutes, seconds] = timeParts.map(Number);
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
      }
  
      // Check if the calculated totalSeconds is within the video duration
      if (totalSeconds <= durationOfVideo) {
        // Set the video's current time
        videoRef.current.currentTime = totalSeconds;
      } else {
        alert("Time exceeds video duration or the video has not been loaded yet.");
      }
    }
  };
  
  
  return (
    loading && <div className='glass'><LoadingAnimation/></div>||
    <Container className='m-0 p-0 py-3'>
      <Row >

        <Col sm={12} md={8}>
          <div className='glass m-2 m-md-0 p-4'>

            {film &&
            <>
              <h2 className='text-white'>{film.title}</h2>
              <VideoPlayer
                film={film}
                videoRef={videoRef}
                setDurationOfVideo={setDurationOfVideo}
              />
            </>
          }

            {timelineMarkers && 
            
            <TimelineProgressBar
              calculateProgress={calculateProgress}
              duration={durationOfVideo}
              currentDuration={currentDurationOfVideo}
              timelineMarkers={timelineMarkers}
              onScrubStart={handleMouseDown}
              onScrubMove={handleMouseMove}
              onScrubEnd={handleMouseUp}
              onMarkerClick={handleMarkerClick}
            />
            }



            <VideoControls
              onPlay={videoPlay}
              onStop={videoStop}
              onReplay={videoReplay}
              onMute={videoMute}
              onUnmute={videoUnMute}
              onVolumeChange={volumeBar}
              volume={volumeOfVideo}
              videoRef={videoRef}
            />

            <Tags keywords={keywords} currentTimelinePos={currentDurationOfVideo} />

          </div>
        </Col>
        <Col sm={12} md={4}>
          <Row>
            <Col>
              <div className='glass m-2 m-md-0 mb-md-4 p-4'>
                <TimelineMarkersList markers={timelineMarkers} currentMarker={currentMarker} onMarkerClick={handleMarkerClick} />
              </div>
            </Col>

          <Col sm={12} md={12}>
            <div className=" glass m-2 m-md-0 p-4">
              <ChatRoom  handleTimeClick={handleTimeClick}/>
            </div>
          </Col>
          </Row>
        </Col>
        <Col className='my-2 my-md-4' sm={12} md={12}>
          <div className=" glass m-2 m-md-0 p-4">
            <MapParent initialPosition={initialPosition} waypointsProp={waypoints} currentDurationOfVideo={currentDurationOfVideo}  onMarkerClick={onMarkerClick}/>
          </div>
        </Col>

     



      </Row>

     
    </Container>
  );
};

export default Player;
