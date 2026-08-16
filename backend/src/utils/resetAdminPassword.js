import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const email = process.env.ADMIN_EMAIL || 'admin@flyy360.com';
  const admin = await Admin.findOne({ email });
  if (!admin) {
    console.log('Admin not found:', email);
    process.exit(1);
  }
  admin.password = process.env.ADMIN_PASSWORD || 'admin123';
  await admin.save();
  console.log('Admin password updated for', admin.email);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
