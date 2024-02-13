// backend/src/controllers/userController.js
import User from '../models/User.js';

// Controlador para manejar el registro de usuarios
export const registerUser = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { username, email, password } = req.body;

    // Crear un nuevo usuario utilizando el modelo de usuario
    const newUser = new User({
      username,
      email,
      password
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Enviar una respuesta de éxito
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    // Manejar errores
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};
