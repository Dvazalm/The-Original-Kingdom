// backend/src/routes/petitionRoutes.js
import express from 'express';
import { getUserInfoByEmail } from '../controllers/petition-controller.js';

const router = express.Router();

router.get('/user/info', getUserInfoByEmail);

export default router;
