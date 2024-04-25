import React, { useState, useEffect, useRef } from 'react';

export function changeMusicBg(musicSrc, volume, audioRef, setAudioSrc) {
  if (audioRef.current) {
      audioRef.current.src = musicSrc;
      audioRef.current.loop = true;
      audioRef.current.volume = volume / 100;
      audioRef.current.play();
      setAudioSrc(musicSrc);
  }
}

export function changeMusicSFX(musicSrc, volumeSFX, audioRefSFX, setAudioSrcSFX) {
  if (audioRefSFX.current) {
      audioRefSFX.current.loop = false;
      audioRefSFX.current.src = musicSrc;
      audioRefSFX.current.volume = volumeSFX / 100;
      audioRefSFX.current.play();
      setAudioSrcSFX(musicSrc);
  }
}

export function AudioController({  changeMusicBg, changeMusicSFX }) {
    const [volume, setVolume] = useState(20);
    const [volumeSFX, setVolumeSFX] = useState(75);
    const [audioSrc, setAudioSrc] = useState(null);
    const [audioSrcSFX, setAudioSrcSFX] = useState(null);
    const audioRef = useRef();
    const audioRefSFX = useRef();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]); // Se ejecutará cada vez que 'volume' cambie

    useEffect(() => {
        if (audioRefSFX.current) {
            audioRefSFX.current.volume = volumeSFX / 100;
        }
    }, [volumeSFX]); // Se ejecutará cada vez que 'volumeSFX' cambie

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const handleVolumeSFXChange = (event) => {
        setVolumeSFX(event.target.value);
    };

    return (
        <div id="pagConfig">
            <audio ref={audioRef} autoPlay loop id='audioRef'>
                <source src={audioSrc} type="audio/mpeg" />
            </audio>
            
            <audio ref={audioRefSFX} autoPlay id='audioRefSFX'>
                <source src={audioSrcSFX} type="audio/mpeg" />
            </audio>


            <div className='volume-block' id="musicVolume">
                <input type="range" min="0" max="100" value={volume} className="volume-slider" onChange={handleVolumeChange} />
            </div>

            <div className='volume-block' id="musicVolumeSFX">
                <input type="range" min="0" max="100" value={volumeSFX} className="volume-slider" onChange={handleVolumeSFXChange} />
            </div>
        </div>
    );
}
