// backend/src/routes/decisionRoutes.js
import express from 'express';
import { randomDecision, createDecision } from '../controllers/decision-controller.js';

const router = express.Router();

router.get('/data', randomDecision);
router.post('/create', createDecision);

export default router;
