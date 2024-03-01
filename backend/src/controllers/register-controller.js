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
      console.log("ERROR: Nombre de usuario o correo electrónico ya están en uso");
      return res.status(400).json({ message: 'Username or email already in use.' });
    }

    // Verificar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("ERROR: El formato del correo electrónico no es válido");
      return res.status(400).json({ message: 'The email format is not valid.' });
    }

    // Generar un hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario utilizando el modelo de usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image: "./resources/img/userImg.png",
      maxscore: 0,
      rol: ""
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Enviar una respuesta de éxito
    console.log("Usuario registrado correctamente");
    res.status(201).json({ message: 'Successfully registered user' });
  } catch (error) {
    // Manejar errores
    console.log('ERROR: Error al registrar usuario', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};
