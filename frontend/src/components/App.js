import React, { useState } from 'react';
import './css/App.css';
import './css/Form.css';
import './css/UserProfile.css';
import './css/Header.css';
import './css/MainMenu.css';
import './css/GameMenu.css';
import './css/Curtain.css';

import Curtain from './Curtain/Curtain';  //Cortina que hace la transicion
import AudioController from './Header/AudioController';  //Controlador de volumen
import LoginAndRegisterController from './Header/LoginAndRegisterController';  //Menu de registro y login
import MainMenu from './MainMenu/MainMenu'; //Menu principal
import GameMenu from './GameMenu/GameMenu'; //Menu principal del juego
import MainMenuButton from './Header/MainMenuButton.js'; //Boton del header que abre el menu principal

function App() {
  const [isGameON, setIsGameON] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);


  /* ===========[ FUNCIONES QUE NO SE DEBEN EXPORTAR ]=========== */

  const handleClickStart = () => {
    setIsCurtainOpen(true);
    setTimeout(() => setIsGameON(true), 1000);
    setTimeout(() => setIsCurtainOpen(false), 3000);
  };
  const handleClickMainMenu = () => {
    setIsCurtainOpen(true);
    setTimeout(() => setIsGameON(false), 1000);
    setTimeout(() => setIsCurtainOpen(false), 3000);
  };
  /* ============================================================ */


  return (
    <div className="App">
      <header className="App-header">

        <AudioController />
        
        {isGameON && (
          <MainMenuButton handleClickMainMenu={handleClickMainMenu} />
        )};
        {!isGameON && (
          <LoginAndRegisterController />
        )};

      </header>

      <div id="App-content">

        {!isGameON && (
          <MainMenu handleClickStart={handleClickStart} />
        )}

        {isGameON && (
         <GameMenu />
        )}

        <Curtain isOpen={isCurtainOpen} />

      </div>
    </div>
  );

}

export default App;
