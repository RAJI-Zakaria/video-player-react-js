interface VideoPlayerProps {
  videoSource: string;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSource,
  videoRef
}) => {

 

  return (
      <video className='w-100 rounded' ref={videoRef} preload='auto'>
        <source src={videoSource} type='video/mp4'></source>
      </video>
  );
};

export default VideoPlayer;
