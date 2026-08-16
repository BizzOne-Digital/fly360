import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ABOUT_AUDIENCES } from '../utils/constants';
import StatsBar from '../sections/StatsBar';
import Testimonials from '../sections/Testimonials';

const ABOUT_IMAGE = '/about.png';

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

  const heading = content.aboutHeading || "We Don't Just Capture Moments.\nWe Create Experiences.";
  const aboutText = content.aboutContent || 'FLYY 360 provides professionally operated 360 booth experiences and social photography designed to create immersive, entertaining and instantly shareable memories.';

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
            <p className="about-body">{aboutText}</p>
            <p className="about-body">
              From birthdays and private parties to weddings, proms, pep rallies, schools, festivals,
              corporate events, brand promotions, and local businesses — we bring the VIP experience to every occasion.
            </p>
          </div>
          <div className="about-page-image">
            <img src={ABOUT_IMAGE} alt="FLYY 360 event experience" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <h3 className="audience-heading">Perfect For</h3>
          <div className="audience-tags">
            {ABOUT_AUDIENCES.map((audience) => (
              <span key={audience} className="audience-tag">{audience}</span>
            ))}
          </div>
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
