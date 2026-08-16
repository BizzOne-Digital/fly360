import Booking from '../models/Booking.js';
import { sendBookingEmails } from '../services/email/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.create(req.body);

  try {
    await sendBookingEmails(booking);
  } catch (emailError) {
    console.error('Email send failed:', emailError.message);
  }

  res.status(201).json({ message: 'Booking request submitted successfully', booking });
});

export const getBookings = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 20 } = req.query;
  const query = {};

  if (status) query.status = status;
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { eventType: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [bookings, total] = await Promise.all([
    Booking.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    Booking.countDocuments(query),
  ]);

  res.json({ bookings, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
});

export const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
});

export const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json({ message: 'Booking deleted' });
});

export const getDashboardStats = asyncHandler(async (req, res) => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [totalInquiries, newBookings, upcomingEvents, recentInquiries] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'New', createdAt: { $gte: thirtyDaysAgo } }),
    Booking.countDocuments({ eventDate: { $gte: now }, status: { $in: ['New', 'Contacted', 'Confirmed'] } }),
    Booking.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.json({ totalInquiries, newBookings, upcomingEvents, recentInquiries });
});
