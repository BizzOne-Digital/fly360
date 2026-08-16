import { baseTemplate } from './baseTemplate.js';

export const bookingConfirmationTemplate = (booking) => {
  const content = `
    <h2 style="color:#f8fafc;font-size:22px;margin:0 0 16px;">Thank You, ${booking.fullName}!</h2>
    <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 24px;">
      We've received your booking request and our team will contact you shortly to confirm your FLYY 360 experience.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e293b;border-radius:12px;padding:20px;">
      <tr><td style="padding:8px 16px;color:#94a3b8;font-size:13px;">Event Type</td><td style="padding:8px 16px;color:#f8fafc;font-size:13px;font-weight:600;">${booking.eventType}</td></tr>
      <tr><td style="padding:8px 16px;color:#94a3b8;font-size:13px;">Event Date</td><td style="padding:8px 16px;color:#f8fafc;font-size:13px;font-weight:600;">${new Date(booking.eventDate).toLocaleDateString()}</td></tr>
      <tr><td style="padding:8px 16px;color:#94a3b8;font-size:13px;">Location</td><td style="padding:8px 16px;color:#f8fafc;font-size:13px;font-weight:600;">${booking.eventLocation}</td></tr>
      ${booking.package ? `<tr><td style="padding:8px 16px;color:#94a3b8;font-size:13px;">Package</td><td style="padding:8px 16px;color:#f8fafc;font-size:13px;font-weight:600;">${booking.package}</td></tr>` : ''}
    </table>
    <p style="color:#94a3b8;font-size:14px;margin:24px 0 0;line-height:1.6;">
      Questions? Reach us at <a href="mailto:booking@flyy360.com" style="color:#2563eb;">booking@flyy360.com</a> or call 706.591.8014.
    </p>
  `;
  return baseTemplate(content);
};

export const bookingAdminNotificationTemplate = (booking) => {
  const content = `
    <h2 style="color:#f8fafc;font-size:22px;margin:0 0 16px;">New Booking Request</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e293b;border-radius:12px;">
      <tr><td style="padding:10px 16px;color:#94a3b8;font-size:13px;">Name</td><td style="padding:10px 16px;color:#f8fafc;font-size:13px;font-weight:600;">${booking.fullName}</td></tr>
      <tr><td style="padding:10px 16px;color:#94a3b8;font-size:13px;">Email</td><td style="padding:10px 16px;color:#f8fafc;font-size:13px;">${booking.email}</td></tr>
      <tr><td style="padding:10px 16px;color:#94a3b8;font-size:13px;">Phone</td><td style="padding:10px 16px;color:#f8fafc;font-size:13px;">${booking.phone}</td></tr>
      <tr><td style="padding:10px 16px;color:#94a3b8;font-size:13px;">Event Type</td><td style="padding:10px 16px;color:#f8fafc;font-size:13px;">${booking.eventType}</td></tr>
      <tr><td style="padding:10px 16px;color:#94a3b8;font-size:13px;">Event Date</td><td style="padding:10px 16px;color:#f8fafc;font-size:13px;">${new Date(booking.eventDate).toLocaleDateString()}</td></tr>
      <tr><td style="padding:10px 16px;color:#94a3b8;font-size:13px;">Location</td><td style="padding:10px 16px;color:#f8fafc;font-size:13px;">${booking.eventLocation}</td></tr>
      <tr><td style="padding:10px 16px;color:#94a3b8;font-size:13px;">Guests</td><td style="padding:10px 16px;color:#f8fafc;font-size:13px;">${booking.numberOfGuests || 'N/A'}</td></tr>
      <tr><td style="padding:10px 16px;color:#94a3b8;font-size:13px;">Package</td><td style="padding:10px 16px;color:#f8fafc;font-size:13px;">${booking.package || 'N/A'}</td></tr>
      <tr><td style="padding:10px 16px;color:#94a3b8;font-size:13px;">Hours</td><td style="padding:10px 16px;color:#f8fafc;font-size:13px;">${booking.estimatedHours || 'N/A'}</td></tr>
      ${booking.addons?.length ? `<tr><td style="padding:10px 16px;color:#94a3b8;font-size:13px;">Add-Ons</td><td style="padding:10px 16px;color:#f8fafc;font-size:13px;">${booking.addons.join(', ')}</td></tr>` : ''}
      ${booking.additionalNotes ? `<tr><td style="padding:10px 16px;color:#94a3b8;font-size:13px;">Notes</td><td style="padding:10px 16px;color:#f8fafc;font-size:13px;">${booking.additionalNotes}</td></tr>` : ''}
    </table>
  `;
  return baseTemplate(content);
};
