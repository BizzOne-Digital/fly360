const STATS = [
  { value: '250+', label: 'Events Serviced' },
  { value: '50,000+', label: 'Photos & Videos Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Booking Support' },
];

export default function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container stats-grid">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-item">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
