import { ADDONS } from '../utils/constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ADDON_ICONS = {
  'Premium Backdrops': '🎬',
  'Props': '🎭',
  'Graphic Design': '🎨',
  'Additional Lighting': '💡',
  'Red Carpet': '🔴',
  'Stanchions': '🚧',
  'Custom Branding': '🏷️',
  'Extra Attendant': '👤',
  'Wardrobe / Location Changes': '👗',
};

export default function AddOns() {
  const ref = useScrollReveal();

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div ref={ref} className="reveal">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Add-Ons</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
            Customize your experience with premium add-ons.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 16,
          }}>
            {ADDONS.map((addon) => (
              <div
                key={addon}
                style={{
                  padding: '24px 20px',
                  background: 'rgba(17, 24, 39, 0.5)',
                  border: '1px solid var(--border-glow)',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-glow)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>
                  {ADDON_ICONS[addon] || '✨'}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                }}>
                  {addon}
                </div>
              </div>
            ))}
            <div style={{
              padding: '24px 20px',
              background: 'rgba(37, 99, 235, 0.05)',
              border: '1px dashed rgba(37, 99, 235, 0.3)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                + Additional custom options
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
