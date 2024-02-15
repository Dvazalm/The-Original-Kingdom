// App.js
import React, { useState } from 'react';
import './css/App.css';
import './css/Form.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import UserProfileMenu from './UserProfileMenu';
import { handleLoginSuccess, handleLoginFailure, handleToggleForm } from './Utils.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  return (
    <div className="App">
      <header className="App-header">

        <div className="logo">
          <img src="./resources/logoLetters.png" className="logoIMG" alt="Logo" />
        </div>

        <div id="registerAndLogin">
          {!isLoggedIn && (
            <>
              <button className='registerButton' onClick={() => handleToggleForm("register", setShowRegisterForm, setShowLoginForm)}>Register</button>
              <button className='loginButton' onClick={() => handleToggleForm("login", setShowRegisterForm, setShowLoginForm)}>Login</button>
              {showRegisterForm && <RegisterForm />}
              {showLoginForm && <LoginForm handleLoginSuccess={(token, email) => { handleLoginSuccess(setIsLoggedIn, setShowLoginForm); setUserEmail(email); }} onLoginFailure={handleLoginFailure} />}
            </>
          )}
          {isLoggedIn && <UserProfileMenu userEmail={userEmail} />}
        </div>
        
      </header>
    </div>
  );
}

export default App;
