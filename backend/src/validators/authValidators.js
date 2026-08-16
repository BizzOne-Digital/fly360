import { body } from 'express-validator';

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
];

export const bookingValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').trim().notEmpty().withMessage('Phone required'),
  body('eventType').trim().notEmpty().withMessage('Event type required'),
  body('eventDate').isISO8601().withMessage('Valid event date required'),
  body('eventLocation').trim().notEmpty().withMessage('Event location required'),
];
