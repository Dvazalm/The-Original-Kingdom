// backend/src/routes/userRoutes.js
import express from 'express';
import { registerUser } from '../controllers/register-controller.js';
import { login } from '../controllers/login-controller.js';
import { getUserByEmail, deleteUserByEmail, updateUserByEmail } from '../controllers/user-Controller.js'; // Importa el controlador para obtener los datos del usuario

const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', registerUser);

// Ruta para el inicio de sesión de usuarios
router.post('/login', login);

// Nueva ruta para obtener los datos del usuario por correo electrónico
router.get('/data/:email', getUserByEmail);

router.delete('/delete/:email', deleteUserByEmail);

router.put('/update/:email', updateUserByEmail);


export default router;
