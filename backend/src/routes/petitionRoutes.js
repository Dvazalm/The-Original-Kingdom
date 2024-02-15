// backend/src/routes/petitionRoutes.js
import express from 'express';
import { getUserImage } from '../controllers/petition-controller.js';

const router = express.Router();

router.get('/userImg/:username', getUserImage);

export default router;
