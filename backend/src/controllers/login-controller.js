import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config.js';

export async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign({id: user._id, email: user.email },config.app.secretKey, { expiresIn: '1h' });

        console.log(`El usuario ${email} se ha logueado correctamente`);

        // Devuelve el token y el correo electrónico del usuario
        return res.json({ token, email: user.email });
      }
    }

    throw new HttpStatusError(401, 'Invalid credentials');
  } catch (error) {
    console.error('No se pudo loguear al usuario:', error);
    next(error);
  }
}
