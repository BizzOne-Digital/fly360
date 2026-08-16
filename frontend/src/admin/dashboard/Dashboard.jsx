import { useState, useEffect } from 'react';
import { bookingAPI, contentAPI } from '../../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, analyticsRes] = await Promise.all([
          bookingAPI.getStats(),
          contentAPI.getAnalytics(),
        ]);
        setStats(statsRes.data);
        setAnalytics(analyticsRes.data);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Loading dashboard...</p>;

  const statCards = [
    { label: 'Total Inquiries', value: stats?.totalInquiries || 0, color: '#60a5fa' },
    { label: 'New Bookings (30d)', value: stats?.newBookings || 0, color: '#4ade80' },
    { label: 'Upcoming Events', value: stats?.upcomingEvents || 0, color: '#fbbf24' },
    { label: 'Gallery Media', value: analytics?.galleryCount || 0, color: '#a78bfa' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 32 }}>Dashboard</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 20,
        marginBottom: 40,
      }}>
        {statCards.map((card) => (
          <div key={card.label} className="admin-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: card.color, marginBottom: 8 }}>
              {card.value}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{card.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 20 }}>Recent Inquiries</h2>
        {stats?.recentInquiries?.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Event</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentInquiries.map((b) => (
                <tr key={b._id}>
                  <td>{b.fullName}</td>
                  <td>{b.eventType}</td>
                  <td>{new Date(b.eventDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${b.status.toLowerCase()}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No inquiries yet.</p>
        )}
      </div>
    </div>
  );
}
