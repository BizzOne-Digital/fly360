import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
    features: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    isEnabled: { type: Boolean, default: true },
    ctaText: { type: String, default: 'BOOK NOW' },
    order: { type: Number, default: 0 },
    imageUrl: { type: String },
    imagePublicId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Package', packageSchema);
