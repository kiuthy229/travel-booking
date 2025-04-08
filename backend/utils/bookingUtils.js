
export const isBookingCancelable = (booking) => {
  const cancellationDeadline = new Date(booking.bookingDate);
  cancellationDeadline.setDate(cancellationDeadline.getDate() - 1);

  return new Date() < cancellationDeadline;
};
