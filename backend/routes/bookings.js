import express from 'express';
import {
  createBooking,
  cancelBooking,
  getSingleBooking,
  getAllBookings,
} from '../controllers/bookingController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyUser, createBooking);
router.get('/', verifyAdmin, getAllBookings);
router.get('/:bookingId', verifyUser, getSingleBooking);
router.delete('/:bookingId', verifyUser, cancelBooking);

export default router;
