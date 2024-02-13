// backend/src/routes/userRoutes.js
import express from 'express';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', registerUser);

export default router;
