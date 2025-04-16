import express, { Request, Response } from 'express';
import {
  createBooking,
  cancelBooking,
  getSingleBooking,
  getAllBookings,
} from '../controllers/bookingController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyUser, (req: Request, res: Response) => {createBooking(req, res)});
router.get('/', verifyAdmin, (req: Request, res: Response) => {getAllBookings(req, res)});
router.get('/:bookingId', verifyUser, (req: Request, res: Response) => {getSingleBooking(req, res)});
router.delete('/:bookingId', verifyUser, (req: Request, res: Response) => {cancelBooking(req, res)});

export default router;
