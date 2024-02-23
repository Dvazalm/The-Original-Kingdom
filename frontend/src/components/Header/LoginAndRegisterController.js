import React, { useState, useRef, useEffect } from 'react';
import RegisterForm from './RegisterForm';
import { LoginForm } from './LoginForm';
import UserProfileMenu from './UserProfileMenu';


function LoginAndRegisterController (){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const formRef = useRef(null);


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
        setUserEmail('');
        console.log("Usuario deslogueado =(");
      };
      useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token && email) {
          setIsLoggedIn(true);
          setUserEmail(email);
        }
      }, []);

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

       const handleLoginSuccess = () => {
        console.log("El usuario se ha logueado correctamente");
        setIsLoggedIn(true);
        setShowLoginForm(false);
      };
      
       const handleLoginFailure = () => {
        console.log("No se pudo iniciar sesión correctamente");
      };
      
       const handleToggleForm = (formType) => {
        if (formType === "register") {
          setShowRegisterForm(prevState => !prevState);
          setShowLoginForm(false);
        } else if (formType === "login") {
          setShowLoginForm(prevState => !prevState);
          setShowRegisterForm(false);
        }
      };
      
      
    return(
        <div id="registerAndLogin">
          {!isLoggedIn && (
            <>
              <button className='registerButton' onClick={() => handleToggleForm("register", setShowRegisterForm, setShowLoginForm)}>Register</button>
              <button className='loginButton' onClick={() => handleToggleForm("login", setShowRegisterForm, setShowLoginForm)}>Login</button>
              {showRegisterForm && <div ref={formRef}><RegisterForm /></div>}
              {showLoginForm && <div ref={formRef}><LoginForm handleLoginSuccess={(token, email) => {handleLoginSuccess(); setUserEmail(email); }} onLoginFailure={handleLoginFailure} /></div>}
            </>
          )}
          {isLoggedIn && (
            <div id='menuDeUsuario'><UserProfileMenu userEmail={userEmail} handleLogout={handleLogout}/></div>
          )}
        </div>
    );
};


export default LoginAndRegisterController;