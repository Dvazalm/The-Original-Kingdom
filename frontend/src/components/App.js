import React, { useState, useRef, useEffect } from 'react';
import './css/App.css';
import './css/Form.css';
import './css/UserProfile.css';
import './css/Header.css';
import './css/MainMenu.css';
import './css/GameMenu.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm.js';
import UserProfileMenu from './UserProfileMenu';
import { handleLoginSuccess, handleLoginFailure, handleToggleForm } from './Utils.js';
import { playSoundEffect, playBackgroundMusic } from "./AudioController.js"; // Importamos las funciones playSoundEffect y playBackgroundMusic
import Curtain from './Curtain'; // Importar el componente Curtain

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [volume, setVolume] = useState(25);
  const [volumeSFX, setVolumeSFX] = useState(25);
  const [isGameON, setIsGameON] = useState(false);
  const formRef = useRef(null);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  

  useEffect(() => {
    handleClickStart();
  });


  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    playBackgroundMusic("./resources/music/backgroundMusic.mp3", newVolume); 
  };

  const handleVolumeSFXChange = (event) => {
    const newVolumeSFX = event.target.value;
    setVolumeSFX(newVolumeSFX);
    playSoundEffect("./resources/music/menuMusic.mp3", newVolumeSFX); // Actualizar el volumen del sonido al cambiar el control deslizante
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserEmail('');
    console.log("Usuario deslogueado =(");
  };

  const handleClickOutsideForm = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowRegisterForm(false);
      setShowLoginForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideForm);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideForm);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const handleClickStart = () => {
    playSoundEffect("./resources/music/menuMusic.mp3", volumeSFX);
    setIsCurtainOpen(true);
    setTimeout(() => setIsGameON(true), 1000);
    setTimeout(() => setIsCurtainOpen(false), 3000);
  };

  const handleClickMainMenu = () => {
    playBackgroundMusic("./resources/music/menuMusic.mp3", volume);
    setIsCurtainOpen(true); 
    setTimeout(() => setIsGameON(false), 1000);
    setTimeout(() => setIsCurtainOpen(false), 3000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="pagConfig">
          <div className='volume-block' id="musicVolume">
            <input type="range" min="0" max="100" value={volume} className="volume-slider" onChange={handleVolumeChange} />
          </div>
          <div className='volume-block' id="musicVolumeSFX">
            <input type="range" min="0" max="100" value={volumeSFX} className="volume-slider" onChange={handleVolumeSFXChange} />
          </div>
        </div>
        {isGameON && (
          <div id='MainMenuButton' onClick={handleClickMainMenu}>Main menu</div>
        )}
        <div id="registerAndLogin">
          {!isLoggedIn && (
            <>
              <button className='registerButton' onClick={() => handleToggleForm("register", setShowRegisterForm, setShowLoginForm)}>Register</button>
              <button className='loginButton' onClick={() => handleToggleForm("login", setShowRegisterForm, setShowLoginForm)}>Login</button>
              {showRegisterForm && <div ref={formRef}><RegisterForm /></div>}
              {showLoginForm && <div ref={formRef}><LoginForm handleLoginSuccess={(token, email) => { handleLoginSuccess(setIsLoggedIn, setShowLoginForm); setUserEmail(email); }} onLoginFailure={handleLoginFailure} /></div>}
            </>
          )}
          {isLoggedIn && !isGameON && (
            <div id='menuDeUsuario'><UserProfileMenu userEmail={userEmail} handleLogout={handleLogout} isGameON={isGameON} /></div>
          )}
        </div>
      </header>
      {!isGameON && (
        <div id='MainMenu'>
          <div className="logo">
            <img src="./resources/img/logoLetters.png" className="logoIMG" alt="Logo" />
          </div>
          <div className='startDiv'>
            <div className='startButton' onClick={handleClickStart}>START</div>
          </div>
        </div>
      )}
      {isGameON && (
        <div id='GameMenu'>
          Juego iniciado
        </div>
      )}
      <Curtain isOpen={isCurtainOpen} />
    </div>
  );
  
}

export default App;
