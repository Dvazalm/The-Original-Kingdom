// LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ handleLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Enviar email junto con la contraseña
      });

      if (response.ok) {
        const data = await response.json();
        handleLoginSuccess(data.token, email); // Pasar el email al manejar el éxito del inicio de sesión
      } else {
        console.log("Credenciales inválidas");
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form id="loginForm" className="formContainer" onSubmit={handleSubmit}>
      <h2>LOGIN</h2>
      <div>
        <input
          placeholder='Email'
          id="loginEmail"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <input
          placeholder='Password'
          type="password"
          id="loginPassword"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" id='submitLoginButtom'>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LoginForm;
