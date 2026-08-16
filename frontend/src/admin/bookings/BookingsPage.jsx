import { useState, useEffect } from 'react';
import { bookingAPI } from '../../services/api';
import { BOOKING_STATUSES } from '../../utils/constants';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await bookingAPI.getAll({ search, status: statusFilter });
      setBookings(res.data.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, [search, statusFilter]);

  const handleUpdate = async (id, data) => {
    try {
      const res = await bookingAPI.update(id, data);
      setBookings((prev) => prev.map((b) => b._id === id ? res.data : b));
      if (selected?._id === id) setSelected(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 24 }}>Bookings</h1>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          className="form-input"
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ maxWidth: 200 }}>
          <option value="">All Statuses</option>
          {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 400px' : '1fr', gap: 24 }}>
        <div className="admin-card">
          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
          ) : bookings.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No bookings found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.fullName}</td>
                    <td>{b.eventType}</td>
                    <td>{new Date(b.eventDate).toLocaleDateString()}</td>
                    <td><span className={`status-badge status-${b.status.toLowerCase()}`}>{b.status}</span></td>
                    <td>
                      <button onClick={() => setSelected(b)} style={{ color: 'var(--accent-blue)', fontSize: '0.8rem' }}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {selected && (
          <div className="admin-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 20 }}>{selected.fullName}</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              <div><strong>Email:</strong> {selected.email}</div>
              <div><strong>Phone:</strong> {selected.phone}</div>
              <div><strong>Event:</strong> {selected.eventType}</div>
              <div><strong>Date:</strong> {new Date(selected.eventDate).toLocaleDateString()}</div>
              <div><strong>Location:</strong> {selected.eventLocation}</div>
              <div><strong>Guests:</strong> {selected.numberOfGuests || 'N/A'}</div>
              <div><strong>Package:</strong> {selected.package || 'N/A'}</div>
              <div><strong>Hours:</strong> {selected.estimatedHours || 'N/A'}</div>
              {selected.addons?.length && <div><strong>Add-Ons:</strong> {selected.addons.join(', ')}</div>}
              {selected.additionalNotes && <div><strong>Notes:</strong> {selected.additionalNotes}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={selected.status}
                onChange={(e) => handleUpdate(selected._id, { status: e.target.value })}
              >
                {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Internal Notes</label>
              <textarea
                className="form-textarea"
                value={selected.internalNotes || ''}
                onChange={(e) => setSelected({ ...selected, internalNotes: e.target.value })}
                rows={3}
              />
              <button
                className="btn btn-secondary"
                style={{ marginTop: 8, fontSize: '0.75rem' }}
                onClick={() => handleUpdate(selected._id, { internalNotes: selected.internalNotes })}
              >
                Save Notes
              </button>
            </div>

            <button onClick={() => setSelected(null)} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 12 }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
