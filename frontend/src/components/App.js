// App.js
import React, { useState } from 'react';
import './css/App.css';
import './css/Form.css';
import './css/UserProfile.css';
import './css/Header.css';
import './css/MainMenu.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm.js';
import UserProfileMenu from './UserProfileMenu';
import { handleLoginSuccess, handleLoginFailure, handleToggleForm } from './Utils.js';
import { MusicController } from "./MusicController.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [volume, setVolume] = useState(25); // Nuevo estado para el volumen

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
  };

  return (
    <div className="App">
      <header className="App-header">

        {/*Configuración general de la web*/}
        <div id="pagConfig">

          {/*Manejar volumen de musica*/}
          <div className='volume-block'>
            <input type="range" min="0" max="100" value={volume} className="volume-slider" onChange={handleVolumeChange}/>
          </div>
          
        </div>

       {/*Sistema de registro*/}
        <div id="registerAndLogin">
          {!isLoggedIn && (
            <>
              <button className='registerButton' onClick={() => handleToggleForm("register", setShowRegisterForm, setShowLoginForm)}>Register</button>
              <button className='loginButton' onClick={() => handleToggleForm("login", setShowRegisterForm, setShowLoginForm)}>Login</button>
              {showRegisterForm && <RegisterForm />}
              {showLoginForm && <LoginForm handleLoginSuccess={(token, email) => { handleLoginSuccess(setIsLoggedIn, setShowLoginForm); setUserEmail(email); }} onLoginFailure={handleLoginFailure} />}
            </>
          )}

          {isLoggedIn && (
            <div id='menuDeUsuario'>{isLoggedIn && <UserProfileMenu userEmail={userEmail} />}</div>
          )}
        </div>

          
           
           <MusicController musicURL="./resources/music/menuMusic.mp3" volume={volume} />
      </header>

      <div id='MainMenu'>

      <div className="logo">
        <img src="./resources/img/logoLetters.png" className="logoIMG" alt="Logo" />
      </div>

      <div className='startDiv'>
    <div className='startButton'>START</div>
</div>


      </div>     {/*Cierre de Menu*/}

    </div>    
  );
}

export default App;
