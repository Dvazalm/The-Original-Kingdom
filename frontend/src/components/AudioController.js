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



let audioElement;

export function playSoundEffect(soundSFX, volumeSFX) {
  if (!audioElement) {
    // Si no existe un elemento de audio, lo creamos
    audioElement = document.createElement('audio');
    audioElement.autoplay = true;
    audioElement.loop = true;
    audioElement.id = "playAudio";
    
    // Añadimos una fuente de audio al elemento audio
    const source = document.createElement('source');
    source.src = soundSFX;
    audioElement.appendChild(source);
    
    // Añadimos el elemento audio al cuerpo del documento
    document.body.appendChild(audioElement);
  } else {
    // Si el elemento de audio ya existe, actualizamos su volumen
    audioElement.volume = volumeSFX / 100;
  }
}


let backgroundAudioElement; // Variable para almacenar el elemento de audio del fondo musical

export function playBackgroundMusic(music, volume) {
  if (!backgroundAudioElement) {
    // Si no existe un elemento de audio para el fondo musical, lo creamos
    backgroundAudioElement = document.createElement('audio');
    backgroundAudioElement.autoplay = true;
    backgroundAudioElement.loop = true;
    backgroundAudioElement.id = "backgroundMusic";
    
    // Añadimos una fuente de audio al elemento de audio del fondo musical
    const source = document.createElement('source');
    source.src = music;
    backgroundAudioElement.appendChild(source);
    
    // Añadimos el elemento de audio del fondo musical al cuerpo del documento
    document.body.appendChild(backgroundAudioElement);
  } else {
    // Si el elemento de audio del fondo musical ya existe, actualizamos su volumen
    backgroundAudioElement.volume = volume / 100;
  }
}
