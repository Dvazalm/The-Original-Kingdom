// frontend/src/App.js
import React, { useState } from 'react';
import './css/App.css';
import './css/Form.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import UserProfileMenu from './UserProfileMenu'; // Importa el componente del menú de usuario
import { toggleVisibilityRegisterAndLogin } from './ToggleVisibility';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para rastrear si el usuario ha iniciado sesión

  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    console.log("El usuario se ha logueado correctamente"); // Mensaje en consola para indicar que el usuario se ha logueado correctamente
    setIsLoggedIn(true);
  };

  // Función para manejar el fallo de inicio de sesión
  const handleLoginFailure = () => {
    console.log("No se pudo iniciar sesión correctamente"); // Mensaje en consola para indicar que no se pudo iniciar sesión correctamente
  };

  return (
    <div className="App">
      <header className="App-header">
        
        <div id='registerAndLogin'>

        {!isLoggedIn && (
          <>
            <button className='registerButton' onClick={() => toggleVisibilityRegisterAndLogin("registerForm")}>Register</button>
            <button className='loginButton' onClick={() => toggleVisibilityRegisterAndLogin("loginForm")}>Login</button>
            <div id="registerForm" style={{ display: "none" }}>
              <RegisterForm />
            </div>
            <div id="loginForm" style={{ display: "none" }}>
              <LoginForm onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} /> {/* Pasa la función handleLoginSuccess y handleLoginFailure como props a LoginForm */}
            </div>
          </>
        )}
        {isLoggedIn && <UserProfileMenu />}
        </div>
      </header>
    </div>
  );
}

export default App;
