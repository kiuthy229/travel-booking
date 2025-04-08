import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userEmail: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
      min: 1,
    },
    phone: {
      type: Number,
      required: true,
    },
    bookAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
