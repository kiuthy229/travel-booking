import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  photo?: string;
  role: string;
}

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

export default mongoose.model<User>('User', userSchema);
