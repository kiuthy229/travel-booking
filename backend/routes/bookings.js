import express from 'express';
import {
  createBooking,
  getSingleBookingInfo,
  cancelBooking,
} from '../controllers/bookingController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyUser, createBooking);
router.get('/:bookingId', verifyUser, getSingleBookingInfo);
router.delete('/:bookingId', verifyUser, cancelBooking);

export default router;
