import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.ts';
import tourRoute from './routes/tours.ts';
import userRoute from './routes/users.ts';
import bookingRoute from './routes/bookings.ts';
import paymentRoute from './routes/payments.ts';
import { connectDatabase } from './utils/database.ts';

dotenv.config();
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '8000', 10);
const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/bookings', bookingRoute);
app.use('/api/v1/payments', paymentRoute);

// Start the server
app.listen(PORT, () => {
  // Connect to MongoDB
  if (process.env.MONGO_URI) {
    connectDatabase(process.env.MONGO_URI);
    console.log('Server is listening to port', PORT);
  } else {
    console.error('MONGO_URI is not defined in environment variables');
  }
});
