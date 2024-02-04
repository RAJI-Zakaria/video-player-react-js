import { useEffect, useState } from "react";
import LoadingAnimation from "../animation/LoadingAnimation";

interface VideoPlayerProps {
  videoSource: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  setDurationOfVideo: React.Dispatch<React.SetStateAction<number>>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSource,
  videoRef,
  setDurationOfVideo
}) => {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleLoadedData = () => {
      console.log('Video is loaded and ready to play');
      setLoading(false);
      if (videoRef.current) {
        setDurationOfVideo(videoRef.current.duration); // this is the solution for the markers to be set on the right place on the timeline "default display"
      }
    };
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleLoadedData); 
      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData); 
      };
    }
  }, [videoRef, videoSource, setDurationOfVideo]);


  

 

  return (
      videoSource &&
     (
      <div>
        {loading && <LoadingAnimation/>}
        <video className='w-100 rounded' ref={videoRef} preload='auto'>
          <source src={videoSource} type='video/mp4'></source>
        </video>

      </div>
     )
  );
};

export default VideoPlayer;
