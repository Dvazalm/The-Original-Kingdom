// backend/src/routes/userRoutes.js
import express from 'express';
import { registerUser } from '../controllers/register-controller.js'; // Importa la función de registro de usuarios
import { login } from '../controllers/login-controller.js'; // Importa la función de inicio de sesión loginUser

const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', registerUser);

// Ruta para el inicio de sesión de usuarios
router.post('/login', login);

export default router;
