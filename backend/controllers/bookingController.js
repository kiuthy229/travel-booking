import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';
import { isBookingCancelable } from '../utils/bookingUtils.js';

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);

  try {
    // Check if the tour exists
    const tour = await Tour.findById(req.body.tourId);
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: 'Tour not found' });
    }

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: err.message,
    });
  }
};

export const getSingleBookingInfo = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate(
      'tourId'
    );
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking',
      error: err.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
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

    res
      .status(200)
      .json({ success: true, message: 'Booking canceled successfully' });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: err.message,
    });
  }
};
