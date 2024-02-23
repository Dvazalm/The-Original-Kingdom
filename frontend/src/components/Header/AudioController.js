import React, { useState } from 'react';

function AudioController (){
    const [volume, setVolume] = useState(25);
    const [volumeSFX, setVolumeSFX] = useState(25);

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
      };
      const handleVolumeSFXChange = (event) => {
        setVolumeSFX(event.target.value);
      };

    return(
        <div id="pagConfig">
        <div className='volume-block' id="musicVolume">
          <input type="range" min="0" max="100" value={volume} className="volume-slider" onChange={handleVolumeChange} />
        </div>
        <div className='volume-block' id="musicVolumeSFX">
          <input type="range" min="0" max="100" value={volumeSFX} className="volume-slider" onChange={handleVolumeSFXChange} />
        </div>
      </div>
    );
}

export default AudioController;