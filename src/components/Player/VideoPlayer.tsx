import { useEffect, useState } from "react";
import LoadingAnimation from "../animation/LoadingAnimation";
import {film} from '../Types'


interface VideoPlayerProps {
  film: film;
  videoRef: React.RefObject<HTMLVideoElement>;
  setDurationOfVideo: React.Dispatch<React.SetStateAction<number>>;
}



const VideoPlayer: React.FC<VideoPlayerProps> = ({
  film,
  videoRef,
  setDurationOfVideo
}) => {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleLoadedData = () => {
      console.log('Video is loaded and ready to play');
      setLoading(false);
      if (videoRef.current) {
        // -----> this is the solution for the markers to be set on the right place on the timeline "default display"
        setDurationOfVideo(videoRef.current.duration); 
      }
    };
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleLoadedData); 
      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData); 
      };
    }
  }, [videoRef, film, setDurationOfVideo]);


  

 

  return (
    film &&
     (
      <div>
        {loading && <LoadingAnimation/>}
        <video className='w-100 rounded' ref={videoRef}>
          <source src={film.file_url} type='video/mp4'></source>
          Your browser does not support the video tag.
        </video>

      </div>
     )
  );
};

export default VideoPlayer;
