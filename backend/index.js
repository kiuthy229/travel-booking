import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.js';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import bookingRoute from './routes/bookings.js';
import { connectDatabase } from './utils/database.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
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

// Start the server
app.listen(PORT, () => {
  // Connect to MongoDB
  connectDatabase(process.env.MONGO_URI);
  console.log('Server is listening to port', PORT);
});
