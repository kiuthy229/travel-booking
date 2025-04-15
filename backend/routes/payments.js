import express from 'express';
import { processPayment } from '../controllers/paymentController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Process payment
router.post('/', verifyUser, processPayment);

export default router;
