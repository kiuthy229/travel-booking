import mongoose, { Document, Schema } from 'mongoose';

export interface Booking extends Document {
  tourId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userEmail?: string;
  fullName: string;
  bookingDate: Date;
  guestSize: number;
  phone: number;
  bookAt: Date;
}

const bookingSchema = new Schema<Booking>(
  {
    tourId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
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

export default mongoose.model<Booking>('Booking', bookingSchema);
