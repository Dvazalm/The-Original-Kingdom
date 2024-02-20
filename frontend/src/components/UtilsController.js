// MusicController.js
import React, { useEffect, useRef } from 'react';

export function MusicController(props) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = props.volume / 100;
    }
  }, [props.volume]);

  return (
    <audio controls autoPlay loop ref={audioRef} style={{display: 'none'}}>
      <source src={props.musicURL} type="audio/mpeg"></source>
    </audio>
  );
}



