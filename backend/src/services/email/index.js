import nodemailer from 'nodemailer';
import { bookingConfirmationTemplate, bookingAdminNotificationTemplate } from '../../templates/bookingEmails.js';

let transporter = null;

export const initEmailService = () => {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_APP_PASSWORD,
    },
  });
};

export const sendEmail = async ({ to, subject, html }) => {
  if (!transporter) initEmailService();

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

export const sendBookingEmails = async (booking) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  await sendEmail({
    to: adminEmail,
    subject: `New Booking Request – ${booking.fullName}`,
    html: bookingAdminNotificationTemplate(booking),
  });

  await sendEmail({
    to: booking.email,
    subject: 'Your FLYY 360 Booking Request Received',
    html: bookingConfirmationTemplate(booking),
  });
};
