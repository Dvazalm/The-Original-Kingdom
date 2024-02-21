let audioElement;

export function playSoundEffect(soundSFX, volumeSFX) {
  if (!audioElement) {
    // Si no existe un elemento de audio, lo creamos
    audioElement = document.createElement('audio');
    audioElement.autoplay = true;
    audioElement.loop = false;
    audioElement.id = "playAudio";
    
    // Añadimos una fuente de audio al elemento audio
    const source = document.createElement('source');
    source.src = soundSFX;
    audioElement.appendChild(source);
    
    // Añadimos el elemento audio al cuerpo del documento
    document.body.appendChild(audioElement);
  } else {
    // Si el elemento de audio ya existe, lo reproducimos y ajustamos su volumen
    audioElement.src = soundSFX; // Cambiamos la fuente del audio
    audioElement.volume = volumeSFX / 100; // Ajustamos el volumen
    audioElement.play(); 
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
