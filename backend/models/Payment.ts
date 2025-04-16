import mongoose, { Document, Schema } from 'mongoose';

interface Payment extends Document {
  userId: mongoose.Types.ObjectId;
  bookingId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  paymentStatus: 'pending' | 'succeeded' | 'failed' | 'refunded' | 'disputed' | 'uncaptured';
  paymentIntentId: string;
}

const paymentSchema = new Schema<Payment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
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
      enum: ['pending', 'succeeded', 'failed', 'refunded', 'disputed', 'uncaptured'],
      default: 'pending',
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Payment>('Payment', paymentSchema);
