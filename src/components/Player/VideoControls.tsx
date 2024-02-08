import React, { useEffect} from 'react';

interface VideoPlayerProps {
  onPlay: () => void;
  onStop: () => void;
  onReplay: () => void;
  onMute: () => void;
  onUnmute: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  volume: number;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  onPlay,
  onStop,
  // onReplay,
  onMute,
  onUnmute,
  onVolumeChange,
  volume,
  videoRef
}) => {

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = parseFloat((volume / 100).toFixed(1));
    }
  }, [volume]);

  return (
      <div className="d-flex flex-wrap align-items-center mt-3">
        <button className="me-2 py-1" onClick={onPlay}>Play</button>
        <button className="me-2 py-1" onClick={onStop}>Stop</button>
        {/* <button className="me-2" onClick={onReplay}>Replay</button> */}
        <button className="me-2 py-1" onClick={onMute}>Mute</button>
        <button className="me-2 py-1" onClick={onUnmute}>Unmute</button>
        <label htmlFor='ranger' className="me-2 text-white">
          <b>Volume</b>
        </label>
        <input id='ranger' type='range' min='0' max='100' step='10' value={volume?volume:0} onChange={onVolumeChange} />
      </div>
  );
};

export default VideoPlayer;
