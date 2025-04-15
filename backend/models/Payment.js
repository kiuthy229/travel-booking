import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingId: {
      type: mongoose.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: [
        'pending',
        'succeeded',
        'failed',
        'refunded',
        'disputed',
        'uncaptured',
      ],
      default: 'pending',
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
