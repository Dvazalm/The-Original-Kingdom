import React, { useState, useRef } from 'react'; // Importa useRef y useState
import './css/App.css';
import './css/Form.css';
import './css/UserProfile.css';
import './css/Header.css';
import './css/MainMenu.css';
import './css/GameMenu.css';
import './css/Curtain.css';

import Curtain from './Curtain/Curtain';  // Cortina que hace la transición
import { AudioController, changeMusicBg, changeMusicSFX } from './Header/AudioController';
import LoginAndRegisterController from './Header/LoginAndRegisterController';  // Menu de registro y login
import MainMenu from './MainMenu/MainMenu'; // Menu principal
import GameMenu from './GameMenu/GameMenu'; // Menu principal del juego
import MainMenuButton from './Header/MainMenuButton.js'; // Boton del header que abre el menu principal

function App() {
  const [isGameON, setIsGameON] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null); // Define setAudioSrc
  const audioRef = useRef();


  /* ===========[ FUNCIONES QUE NO SE DEBEN EXPORTAR ]=========== */

  const playSoundSFX = (soundPath) => {
    const audioElement = document.getElementById('audioRefSFX');
    audioElement.src = soundPath;
    audioElement.play();
};
const playSound = (soundPath) => {
    const audioElement = document.getElementById('audioRef');
    audioElement.src = soundPath;
    audioElement.play();
};


  const handleClickStart = () => {
    setIsCurtainOpen(true);
    setTimeout(() => {
        setIsGameON(true);
        changeMusicBg("./resources/music/menuMusic.mp3", 25, audioRef, setAudioSrc); // Modificado aquí
    }, 1000);
    setTimeout(() => setIsCurtainOpen(false), 3000);
  };

  const handleClickMainMenu = () => {
    playSound("./resources/music/silend.ogg");
    setIsCurtainOpen(true);
    setTimeout(() => setIsGameON(false), 1000);
    setTimeout(() => setIsCurtainOpen(false), 3000);
  };
  /* ============================================================ */


  return (
    <div className="App">
      <header className="App-header">

        <AudioController
          changeMusicBg={changeMusicBg}
          changeMusicSFX={changeMusicSFX}
          audioRef={audioRef}
          setAudioSrc={setAudioSrc} // Pasar setAudioSrc como prop
        />
        
        {isGameON && (
          <MainMenuButton handleClickMainMenu={handleClickMainMenu} />
        )}
        {!isGameON && (
          <LoginAndRegisterController />
        )}

      </header>

      <div id="App-content">

        {!isGameON && (
          <MainMenu handleClickStart={handleClickStart} />
        )}

        {isGameON && (
         <GameMenu handleClickMainMenu={handleClickMainMenu}/>
        )}

        <Curtain isOpen={isCurtainOpen} />

      </div>
    </div>
  );

}

export default App;
