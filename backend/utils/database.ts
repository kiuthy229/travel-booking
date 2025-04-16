import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export const connectDatabase = async (mongoUri: string): Promise<void> => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('Connected to MongoDB');
  } catch (err: any) {
    console.error('Failed to connect to MongoDB:', err.message);
    console.error('Stack trace:', err.stack);
    throw err;
  }
};
