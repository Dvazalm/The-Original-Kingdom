// backend/src/routes/index.js
import express from 'express';
import { login } from '../controllers/login-controller.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.post('/login', login);

router.use('/user', userRoutes);

export default router;
