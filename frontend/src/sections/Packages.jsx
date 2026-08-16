import { useScrollReveal } from '../hooks/useScrollReveal';

function PackageCard({ pkg, index }) {
  const ref = useScrollReveal();

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        position: 'relative',
        background: pkg.isPremium
          ? 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(17,24,39,0.9) 100%)'
          : 'var(--glass)',
        backdropFilter: 'blur(20px)',
        border: pkg.isPremium
          ? '1px solid rgba(212, 175, 55, 0.3)'
          : pkg.isFeatured
          ? '1px solid rgba(37, 99, 235, 0.5)'
          : '1px solid var(--border-glow)',
        borderRadius: 'var(--radius)',
        padding: '40px 32px',
        transition: 'all 0.3s',
        transitionDelay: `${index * 0.1}s`,
        transform: pkg.isFeatured ? 'scale(1.02)' : 'none',
        boxShadow: pkg.isFeatured ? 'var(--shadow-glow)' : pkg.isPremium ? 'var(--shadow-gold)' : 'none',
      }}
    >
      {pkg.isFeatured && (
        <div style={{
          position: 'absolute',
          top: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '6px 20px',
          background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
          borderRadius: '50px',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
        }}>
          MOST POPULAR
        </div>
      )}

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.1rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        marginBottom: 8,
        color: pkg.isPremium ? 'var(--accent-gold)' : 'var(--text-primary)',
      }}>
        {pkg.name}
      </h3>

      <div style={{
        fontSize: '2rem',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        marginBottom: 4,
      }}>
        {pkg.duration}
      </div>

      <div style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: pkg.isPremium ? 'var(--accent-gold)' : 'var(--accent-blue-light)',
        marginBottom: 16,
      }}>
        {pkg.price}
      </div>

      {pkg.description && (
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          marginBottom: 24,
          lineHeight: 1.6,
        }}>
          {pkg.description}
        </p>
      )}

      {pkg.features?.length > 0 && (
        <ul style={{ listStyle: 'none', marginBottom: 32 }}>
          {pkg.features.map((f) => (
            <li key={f} style={{
              padding: '8px 0',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <span style={{
                color: pkg.isPremium ? 'var(--accent-gold)' : 'var(--accent-blue)',
                fontSize: '0.7rem',
              }}>✓</span>
              {f}
            </li>
          ))}
        </ul>
      )}

      <button
        className={pkg.isPremium ? 'btn btn-gold' : 'btn btn-primary'}
        onClick={scrollToContact}
        style={{ width: '100%' }}
      >
        {pkg.ctaText || 'BOOK NOW'}
      </button>
    </div>
  );
}

export default function Packages({ packages = [] }) {
  return (
    <section id="packages" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          CHOOSE YOUR EXPERIENCE
        </h2>
        <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
          Select the perfect package for your event. All packages include operator assistance and digital sharing.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}>
          {packages.filter((p) => p.isEnabled).map((pkg, i) => (
            <PackageCard key={pkg._id || pkg.name} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
