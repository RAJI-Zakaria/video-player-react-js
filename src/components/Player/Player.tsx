import React, {  useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TimelineMarkersList from './TimelineMarkersList';
import VideoPlayer from './VideoPlayer';
import VideoControls from './VideoControls';
import TimelineProgressBar from './TimelineProgressBar';

import {getFilm} from '../../api/film'

import LoadingAnimation from '../animation/LoadingAnimation';

interface Film {
  file_url: string;
  synopsis_url: string;
  title: string;
}
interface Chapter { 
  pos: number; 
  title: string 
}

const Player: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [film, setFilm] = useState<Film>({});
  
  const [volumeOfVideo, setVolumeOfVideo] = useState(100);
  const [durationOfVideo, setDurationOfVideo] = useState(0);
  const [currentDurationOfVideo, setCurrentDurationOfVideo] = useState(0);
  const [currentMarker, setCurrentMarker] = useState(0);
  const [timelineMarkers, setTimelineMarkers] = useState<Array<Chapter>>([
    //OLD ===> 
    // { pos: 1, title: 'Introduction' },
    // { pos: 1.5, title: 'Key Moment' },
    // { time: 2.37, title: 'Highlight' },
    // { time: 2.75, title: 'Transition' },
    // { time: 4, title: 'Action Sequence' },
    // { time: 8, title: 'Conclusion' },
  ]);
  
  useEffect(()=>{
    const fetchFilm = async () => {
      setLoading(true);
      try {
        const film = await getFilm();

        if(film.ok){
          setFilm(film.data.Film)
          setTimelineMarkers(film.data.Chapters)
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
  
//useeffect for durationOfVideo
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

        const activeMarker = timelineMarkers.find(
          (marker, index) =>
          videoRef.current && videoRef.current.currentTime >= marker.pos &&
            (index === timelineMarkers.length - 1 || videoRef.current?.currentTime < timelineMarkers[index + 1].pos)
        );

        if (activeMarker) {
          console.log(`Reached marker at ${activeMarker.pos} seconds: ${activeMarker.title}`);
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
  return (
    loading && <div className='glass'><LoadingAnimation/></div>||
    <Container className='m-0 p-0'>
      <Row >

        <Col sm={12} md={8}>
          <div className='glass m-2 m-md-0 p-4'>
            <h2 className='text-white'>{film && film.title}</h2>
            <VideoPlayer
              videoSource={film ? film.file_url : 'https://www.w3schools.com/html/mov_bbb.mp4'}
              videoRef={videoRef}
              setDurationOfVideo={setDurationOfVideo}
            />

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
          </div>
          

        </Col>



        <Col sm={12} md={4}>
          <div className='glass m-2 m-md-0 p-4'>
            <TimelineMarkersList markers={timelineMarkers} currentMarker={currentMarker} onMarkerClick={handleMarkerClick} />
            </div>
        </Col>
      </Row>

     
    </Container>
  );
};

export default Player;
