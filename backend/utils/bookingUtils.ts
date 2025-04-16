import { Booking } from '../models/Booking';

export const isBookingCancelable = (booking: Booking): boolean => {
  const cancellationDeadline = new Date(booking.bookingDate);
  cancellationDeadline.setDate(cancellationDeadline.getDate() - 1);

  return new Date() < cancellationDeadline;
};
