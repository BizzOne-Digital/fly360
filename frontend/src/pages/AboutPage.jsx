import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ABOUT_AUDIENCES } from '../utils/constants';
import StatsBar from '../sections/StatsBar';
import Testimonials from '../sections/Testimonials';

const DEFAULT_ABOUT_IMAGE = '/img1.jpg';

const WHY_CHOOSE_US = [
  {
    title: 'Fully Operator-Assisted',
    description: 'Every booth is run by a trained attendant, so your guests never have to guess how it works and your event always runs smoothly.',
  },
  {
    title: 'Premium Equipment & Presentation',
    description: 'Professional lighting, custom overlays, premium props, and branded backdrops that elevate any event to a VIP experience.',
  },
  {
    title: 'Fast, Reliable Booking',
    description: 'Clear pricing, simple packages, and quick responses — from your first inquiry to the day of your event.',
  },
  {
    title: 'Built for Every Occasion',
    description: 'From intimate birthdays to large corporate activations, our packages scale to match your guest count and event goals.',
  },
];

export default function AboutPage() {
  const { content } = useOutletContext();

  const heading = content.aboutHeading || 'About FLYY 360 (Raw & Reel)';
  const aboutImage = content.aboutImage?.url || DEFAULT_ABOUT_IMAGE;

  return (
    <main className="page-main">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">ABOUT US</h1>
          <p className="page-subtitle">Premium 360 experiences crafted for unforgettable celebrations.</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-page-grid">
          <div className="about-page-text">
            <h2 className="section-title" style={{ whiteSpace: 'pre-line' }}>{heading}</h2>
            <p className="about-body">
              At FLYY 360 (Raw &amp; Reel), we believe every event deserves to feel unforgettable. Based in Rome,
              Georgia, we bring a premium entertainment and photography experience directly to you—and we travel
              to help make celebrations and special events extraordinary wherever they take place.
            </p>
            <p className="about-body">
              We specialize in operator-assisted 360 Photo Booth experiences and Social Photography, designed to
              capture the energy, personality, and excitement of every moment. But we&apos;re more than just a
              photo booth—we create an experience where you and your guests are the stars.
            </p>
            <p className="about-body">
              From premium backdrops and creative props to VIP treatment, custom overlays, promotional branding,
              and more, we pay attention to the details that take an ordinary event and turn it into a memorable
              experience. Our professional team is dedicated to providing exceptional service from setup to the
              final photo, video, and social-ready memories.
            </p>
          </div>
          <div className="about-page-image">
            <img src={aboutImage} alt="FLYY 360 event experience" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <h3 className="audience-heading">We Cater To</h3>
          <div className="audience-tags">
            {ABOUT_AUDIENCES.map((audience) => (
              <span key={audience} className="audience-tag">{audience}</span>
            ))}
          </div>
          <p className="about-body" style={{ textAlign: 'center', maxWidth: 720, margin: '24px auto 0' }}>
            Whether you&apos;re celebrating a milestone, creating memories with family and friends, promoting your
            brand, or hosting a major corporate event, FLYY 360 (Raw &amp; Reel) is ready to bring the energy.
          </p>
        </div>
      </section>

      <section className="section section-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Your Event. Your Moment. Your Spotlight.</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 8px' }}>
            We don&apos;t just show up—we show out. Our goal is to make every client feel like a VIP while
            delivering a polished, professional, and exciting experience your guests will be talking about long
            after the event is over.
          </p>
          <p style={{ color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.02em' }}>
            FLYY 360 (Raw &amp; Reel) — Where Every Moment Becomes a Memory.
          </p>
        </div>
      </section>

      <StatsBar />

      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>WHY CHOOSE FLYY 360</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
            We combine premium equipment, hands-on service, and reliable booking so you can focus on your event, not the logistics.
          </p>
          <div className="why-choose-grid">
            {WHY_CHOOSE_US.map((item) => (
              <div key={item.title} className="why-choose-card">
                <h3 className="why-choose-title">{item.title}</h3>
                <p className="why-choose-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section section-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to bring FLYY 360 to your event?</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 24px' }}>
            Tell us about your date, guest count, and vision — we&apos;ll help you pick the right package.
          </p>
          <Link to="/contact" className="btn btn-primary btn-pill">BOOK NOW</Link>
        </div>
      </section>
    </main>
  );
}
