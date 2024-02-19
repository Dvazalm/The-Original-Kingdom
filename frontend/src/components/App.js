// App.js
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

  const handleLogout = () => {
    // Limpiar el almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    // Actualizar el estado de isLoggedIn
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
    // Verificar si hay un token almacenado en el almacenamiento local al cargar la aplicación
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      // Aquí puedes establecer el estado de isLoggedIn como true y realizar cualquier otra inicialización necesaria
      setIsLoggedIn(true);
      setUserEmail(email);
    }
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
            <div id='menuDeUsuario'><UserProfileMenu userEmail={userEmail} handleLogout={handleLogout} /></div>
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
