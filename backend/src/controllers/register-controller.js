// backend/src/controllers/userController.js
import bcrypt from 'bcrypt';
import User from '../models/User.js';

// Controlador para manejar el registro de usuarios
export const registerUser = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { username, email, password } = req.body;

    // Verificar si ya existe un usuario con el mismo nombre de usuario o correo electrónico
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Nombre de usuario o correo electrónico ya están en uso' });
    }

    // Verificar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'El formato del correo electrónico no es válido' });
    }

    // Generar un hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario utilizando el modelo de usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Enviar una respuesta de éxito
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    // Manejar errores
    console.log('Error al registrar usuario', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};
