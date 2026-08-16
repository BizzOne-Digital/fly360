import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventLocation: { type: String, required: true },
    numberOfGuests: { type: Number },
    package: { type: String },
    addons: [{ type: String }],
    estimatedHours: { type: Number },
    additionalNotes: { type: String },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'New',
    },
    internalNotes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
