import mongoose from 'mongoose';

// Serverless-safe: reuse the connection across warm invocations instead of
// reconnecting (or crashing the process) on every cold start.
let connectPromise = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  if (connectPromise) return connectPromise;

  connectPromise = mongoose
    .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
    .then((conn) => {
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return conn;
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error.message);
      connectPromise = null; // allow retry on the next request
      throw error;
    });

  return connectPromise;
};
