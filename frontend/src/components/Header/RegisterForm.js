// RegisterForm.js
import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [color, setcolor] = useState('');
  const [size, setsize] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log("Las contraseñas no coinciden");
      setAlertMessage("Passwords do not match.");
      return;
    }  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const data = await response.json();
        setAlertMessage(data.message);
        return;
      }else{
      setAlertMessage('Successful registration');
      setcolor("lime");
      setsize("20px");
      console.log("Usuario registrado correctamente")
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });}
    } catch (error) {
      console.error('Error:', error.message);
      setAlertMessage('Error to register user');
    }
  };

  return (
    <form id="registerForm" className="formContainer" onSubmit={handleSubmit}>
      <h2>REGISTER</h2>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
      <button id='submitRegisterButtom' type="submit">Register</button>
      {alertMessage && <div className="alert" style={{color: color, fontSize: size}}>{alertMessage}</div>}
    </form>
  );
};

export default RegisterForm;
