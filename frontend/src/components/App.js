import React, { useState } from 'react';
import './css/App.css';
import './css/Form.css';
import './css/UserProfile.css';
import './css/Header.css';
import './css/MainMenu.css';
import './css/GameMenu.css';
import './css/Curtain.css';

import Curtain from './Curtain/Curtain';
import AudioController from './Header/AudioController';
import LoginAndRegisterController from './Header/LoginAndRegisterController';
import MainMenu from './MainMenu/MainMenu';
import GameMenu from './GameMenu/GameMenu';

function App() {
  const [isGameON, setIsGameON] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);


  /* ===========[ FUNCIONES QUE FALTAN POR EXPORTAR ]=========== */

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

        {!isGameON && (
          <LoginAndRegisterController />
        )};


      </header>
      <div id="App-content">

        {!isGameON && (
          <MainMenu handleClickStart={handleClickStart} />
        )}

        {isGameON && (
         <GameMenu handleClickMainMenu={handleClickMainMenu} />
        )}

        <Curtain isOpen={isCurtainOpen} />

      </div>
    </div>
  );

}

export default App;
