import { Request, Response } from 'express';
import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';
import { isBookingCancelable } from '../utils/bookingUtils.js';

export const createBooking = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const newBooking = new Booking(req.body);

  try {
    const tour = await Tour.findById(req.body.tourId);
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: 'Tour not found' });
    }

    const savedBooking = await newBooking.save();

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: savedBooking,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: err.message,
    });
  }
};

export const getAllBookings = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const bookings = await Booking.find({});

    return res.status(200).json({
      success: true,
      message: 'Successfully retrieve all bookings',
      data: bookings,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Cannot retrieve all bookings information',
      error: err.message,
    });
  }
};

export const getSingleBooking = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate(
      'tourId'
    );
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }
    return res.status(200).json({ success: true, data: booking });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking',
      error: err.message,
    });
  }
};

export const cancelBooking = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }

    if (!isBookingCancelable(booking)) {
      return res
        .status(400)
        .json({ success: false, message: 'Booking cannot be canceled.' });
    }

    await Booking.findByIdAndDelete(req.params.bookingId);

    return res
      .status(200)
      .json({ success: true, message: 'Booking canceled successfully' });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: err.message,
    });
  }
};
