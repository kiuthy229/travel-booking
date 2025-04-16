import { login, register } from '../controllers/authController.js';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/register', (req: Request, res: Response) => {
  register(req, res);
});
router.post('/login', (req: Request, res: Response) => {
  login(req, res);
});

export default router;
