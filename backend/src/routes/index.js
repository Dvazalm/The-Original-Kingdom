// backend/src/routes/index.js
import express from 'express';
import { login } from '../controllers/login-controller.js';
import userRoutes from './userRoutes.js';
import petitionRoutes from './petitionRoutes.js'; // Importar la nueva ruta

const router = express.Router();

router.post('/login', login);

router.use('/user', userRoutes);

router.use('/petition', petitionRoutes);

export default router;
