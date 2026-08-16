import { ABOUT_AUDIENCES } from '../utils/constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ABOUT_IMAGE = '/about.png';

export default function About({ content = {} }) {
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();

  const heading = content.aboutHeading || 'We Don\'t Just Capture Moments.\nWe Create Experiences.';
  const aboutText = content.aboutContent || 'FLYY 360 provides professionally operated 360 booth experiences and social photography designed to create immersive, entertaining and instantly shareable memories.';

  return (
    <section id="about" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div
          ref={ref1}
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
            marginBottom: 80,
          }}
        >
          <div>
            <h2 className="section-title" style={{ whiteSpace: 'pre-line' }}>
              {heading}
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              marginBottom: 24,
            }}>
              {aboutText}
            </p>
          </div>
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            aspectRatio: '4/3',
          }}>
            <img
              src={ABOUT_IMAGE}
              alt="FLYY 360 event experience"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid var(--border-glow)',
              borderRadius: 'var(--radius-lg)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>

        <div ref={ref2} className="reveal">
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: 24,
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}>
            Perfect For
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
          }}>
            {ABOUT_AUDIENCES.map((audience) => (
              <span
                key={audience}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(37, 99, 235, 0.08)',
                  border: '1px solid var(--border-glow)',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  transition: 'all 0.3s',
                }}
              >
                {audience}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
