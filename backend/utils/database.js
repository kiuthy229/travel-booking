import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
export const connectDatabase = async (mongoUri) => {
 try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    console.error('Stack trace:', err.stack);
    throw err;
  }
};
