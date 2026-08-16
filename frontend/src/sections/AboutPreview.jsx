import { Link } from 'react-router-dom';
import { ABOUT_AUDIENCES } from '../utils/constants';

const ABOUT_IMAGE = '/about.png';

export default function AboutPreview({ content = {} }) {
  const heading = content.aboutHeading || "We Don't Just Capture Moments.\nWe Create Experiences.";
  const aboutText = content.aboutContent || 'FLYY 360 provides professionally operated 360 booth experiences and social photography designed to create immersive, entertaining and instantly shareable memories.';

  return (
    <section className="section about-preview">
      <div className="container about-preview-grid">
        <div className="about-preview-text">
          <h2 className="section-title" style={{ whiteSpace: 'pre-line' }}>{heading}</h2>
          <p>{aboutText}</p>
          <p>
            From birthdays, weddings, proms, schools, festivals, corporate events, and brand activations —
            we deliver a premium VIP experience every time.
          </p>
          <div className="about-preview-tags">
            {ABOUT_AUDIENCES.slice(0, 6).map((tag) => (
              <span key={tag} className="about-preview-tag">{tag}</span>
            ))}
          </div>
          <Link to="/about" className="btn btn-secondary btn-pill">LEARN MORE ABOUT US</Link>
        </div>
        <div className="about-preview-image">
          <img src={ABOUT_IMAGE} alt="FLYY 360 event experience" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
