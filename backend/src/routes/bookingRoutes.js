import { Router } from 'express';
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getDashboardStats,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { bookingValidation } from '../validators/authValidators.js';

const router = Router();

router.post('/', bookingValidation, validate, createBooking);
router.get('/stats', protect, getDashboardStats);
router.get('/', protect, getBookings);
router.get('/:id', protect, getBooking);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

export default router;
