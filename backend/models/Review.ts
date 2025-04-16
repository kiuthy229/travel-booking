import mongoose, { Document, Schema } from 'mongoose';

interface Review extends Document {
  _id: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  username: string;
  reviewText: string;
  rating: number;
}

const reviewSchema = new Schema<Review>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
    },
    username: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Review>('Review', reviewSchema);
