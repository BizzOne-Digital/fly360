import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from '../config/database.js';
import { configureCloudinary } from '../config/cloudinary.js';
import { initEmailService } from '../services/email/index.js';
import { errorHandler } from '../middleware/errorHandler.js';

import authRoutes from '../routes/authRoutes.js';
import bookingRoutes from '../routes/bookingRoutes.js';
import galleryRoutes from '../routes/galleryRoutes.js';
import serviceRoutes from '../routes/serviceRoutes.js';
import packageRoutes from '../routes/packageRoutes.js';
import contentRoutes from '../routes/contentRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
configureCloudinary();
initEmailService();

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FLYY 360 API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/content', contentRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`FLYY 360 API running on port ${PORT}`);
});
