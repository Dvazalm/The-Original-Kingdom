// backend/src/routes/decisionRoutes.js
import express from 'express';
import { randomDecision, createDecision, getDecision } from '../controllers/decision-controller.js';

const router = express.Router();

router.get('/randomDecision', randomDecision);
router.get('/data', getDecision);
router.post('/create', createDecision);

export default router;
