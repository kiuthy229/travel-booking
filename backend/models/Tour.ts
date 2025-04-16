import mongoose, { Document, Schema } from 'mongoose';

interface Tour extends Document {
  title: string;
  city: string;
  address: string;
  distance: number;
  photo: string;
  desc: string;
  price: number;
  maxGroupSize: number;
  reviews: mongoose.Types.ObjectId[];
  featured: boolean;
  averageRating: number;
}

const tourSchema = new Schema<Tour>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Review',
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Tour>('Tour', tourSchema);
