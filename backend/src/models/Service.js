import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: String, required: true },
    priceLabel: { type: String, default: 'Starting at' },
    features: [{ type: String }],
    imageUrl: { type: String },
    imagePublicId: { type: String },
    category: { type: String, default: 'general' },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
