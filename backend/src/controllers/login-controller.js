// backend/src/controllers/login-controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Corrige la ruta de importación del modelo User
import config from '../config.js'; // Importa el archivo de configuración

export async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    // Busca el usuario en la base de datos
    const user = await User.findOne({ username });

    if (user) {
      // Comprueba si la contraseña coincide con la almacenada en la base de datos
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Genera el token de autenticación
        const token = jwt.sign({ id: user._id, username: user.username }, config.app.secretKey, { expiresIn: '1h' });

        console.log(`El usuario ${username} se ha logueado correctamente`); // Mensaje de consola para inicio de sesión exitoso

        return res.json({ token });
      }
    }

    // Si las credenciales son inválidas, devuelve un error
    throw new HttpStatusError(401, 'Invalid credentials');
  } catch (error) {
    console.error('No se pudo loguear al usuario:', error); // Mensaje de consola para inicio de sesión fallido
    next(error); // Pasa el error al middleware de manejo de errores
  }
}
