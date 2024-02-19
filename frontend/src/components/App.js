import React, { useState, useRef, useEffect } from 'react';
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
  const [volume, setVolume] = useState(25);
  const formRef = useRef(null);

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
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

  return (
    <div className="App">
      <header className="App-header">
        <div id="pagConfig">
          <div className='volume-block'>
            <input type="range" min="0" max="100" value={volume} className="volume-slider" onChange={handleVolumeChange}/>
          </div>
        </div>

        <div id="registerAndLogin">
          {!isLoggedIn && (
            <>
              <button className='registerButton' onClick={() => handleToggleForm("register", setShowRegisterForm, setShowLoginForm)}>Register</button>
              <button className='loginButton' onClick={() => handleToggleForm("login", setShowRegisterForm, setShowLoginForm)}>Login</button>
              {showRegisterForm && <div ref={formRef}><RegisterForm /></div>}
              {showLoginForm && <div ref={formRef}><LoginForm handleLoginSuccess={(token, email) => { handleLoginSuccess(setIsLoggedIn, setShowLoginForm); setUserEmail(email); }} onLoginFailure={handleLoginFailure} /></div>}
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
        <div className='startButton' onClick={() => console.log("boton pulsado")}>START</div>
        </div>
      </div>
    </div>    
  );
}

export default App;
