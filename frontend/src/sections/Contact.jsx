import { useState } from 'react';
import { bookingAPI } from '../services/api';
import { EVENT_TYPES, ADDONS } from '../utils/constants';

export default function Contact({ settings = {}, packages = [] }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    numberOfGuests: '',
    package: '',
    addons: [],
    estimatedHours: '',
    additionalNotes: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddonChange = (addon) => {
    setForm((prev) => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter((a) => a !== addon)
        : [...prev.addons, addon],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await bookingAPI.create({
        ...form,
        numberOfGuests: form.numberOfGuests ? parseInt(form.numberOfGuests) : undefined,
        estimatedHours: form.estimatedHours ? parseInt(form.estimatedHours) : undefined,
      });
      setStatus({
        type: 'success',
        message: 'Thank you! Your booking request has been submitted. We\'ll contact you shortly to confirm your FLYY 360 experience.',
      });
      setForm({
        fullName: '', email: '', phone: '', eventType: '', eventDate: '',
        eventLocation: '', numberOfGuests: '', package: '', addons: [],
        estimatedHours: '', additionalNotes: '',
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Something went wrong. Please try again or call us directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contact-section">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 64,
          alignItems: 'start',
        }}>
          <div>
            <h2 className="section-title">Book Your Experience</h2>
            <p className="section-subtitle">
              Ready to create unforgettable moments? Get in touch or submit a booking request.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 4 }}>PHONE</div>
                <a href={`tel:${settings.phone || '7065918014'}`} style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-blue-light)' }}>
                  {settings.phone || '706.591.8014'}
                </a>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 4 }}>EMAIL</div>
                <a href={`mailto:${settings.email || 'booking@flyy360.com'}`} style={{ fontSize: '1.1rem', color: 'var(--accent-blue-light)' }}>
                  {settings.email || 'booking@flyy360.com'}
                </a>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 4 }}>LOCATION</div>
                <p style={{ color: 'var(--text-secondary)' }}>{settings.location || 'Serving Rome, GA and Surrounding Areas'}</p>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                {settings.instagramUrl && (
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '10px 20px',
                      border: '1px solid var(--border-glow)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      transition: 'all 0.3s',
                    }}
                  >
                    {settings.instagram || '@flyy_360'}
                  </a>
                )}
                {settings.facebookUrl && (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '10px 20px',
                      border: '1px solid var(--border-glow)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      transition: 'all 0.3s',
                    }}
                  >
                    Facebook
                  </a>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '40px' }}>
            {status.message && (
              <div style={{
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 24,
                background: status.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${status.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                color: status.type === 'success' ? '#4ade80' : '#f87171',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}>
                {status.message}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" name="fullName" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input className="form-input" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Event Type *</label>
                <select className="form-select" name="eventType" value={form.eventType} onChange={handleChange} required>
                  <option value="">Select event type</option>
                  {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Event Date *</label>
                <input className="form-input" type="date" name="eventDate" value={form.eventDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Event Location *</label>
                <input className="form-input" name="eventLocation" value={form.eventLocation} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Number of Guests</label>
                <input className="form-input" type="number" name="numberOfGuests" value={form.numberOfGuests} onChange={handleChange} min="1" />
              </div>
              <div className="form-group">
                <label className="form-label">Estimated Hours</label>
                <input className="form-input" type="number" name="estimatedHours" value={form.estimatedHours} onChange={handleChange} min="1" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Package</label>
                <select className="form-select" name="package" value={form.package} onChange={handleChange}>
                  <option value="">Select a package</option>
                  {packages.map((p) => <option key={p._id} value={p.name}>{p.name} — {p.price}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Add-Ons</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ADDONS.map((addon) => (
                  <label
                    key={addon}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 14px',
                      border: form.addons.includes(addon) ? '1px solid var(--accent-blue)' : '1px solid var(--border-glow)',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      background: form.addons.includes(addon) ? 'rgba(37,99,235,0.1)' : 'transparent',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.addons.includes(addon)}
                      onChange={() => handleAddonChange(addon)}
                      style={{ display: 'none' }}
                    />
                    {addon}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Additional Notes</label>
              <textarea className="form-textarea" name="additionalNotes" value={form.additionalNotes} onChange={handleChange} placeholder="Tell us about your event..." />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'SUBMITTING...' : 'REQUEST YOUR BOOKING'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact .container > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #contact form > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
