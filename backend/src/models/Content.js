import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    section: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Content', contentSchema);
