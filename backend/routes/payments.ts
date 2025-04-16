import express, { Request, Response } from 'express';
import { processPayment } from '../controllers/paymentController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Process payment
router.post('/', verifyUser, (req: Request, res: Response) => {processPayment(req, res)});

export default router;
