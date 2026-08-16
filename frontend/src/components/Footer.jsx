import { Link } from 'react-router-dom';
import Logo from './Logo';
import { IconPhone, IconEmail, IconLocation, IconInstagram, IconFacebook } from './icons';

export default function Footer({ settings = {} }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-contact">
          <div className="footer-contact-item">
            <IconPhone size={18} />
            <a href={`tel:${(settings.phone || '7065918014').replace(/\./g, '')}`}>
              {settings.phone || '706.591.8014'}
            </a>
          </div>
          <div className="footer-contact-item">
            <IconEmail size={18} />
            <a href={`mailto:${settings.email || 'booking@flyy360.com'}`}>
              {settings.email || 'booking@flyy360.com'}
            </a>
          </div>
          <div className="footer-contact-item">
            <IconLocation size={18} />
            <span>{settings.location || 'Serving Rome, GA and Surrounding Areas'}</span>
          </div>
        </div>

        <div className="footer-logo">
          <Logo size="lg" />
        </div>

        <div className="footer-social">
          <h4>FOLLOW US</h4>
          <div className="social-icons">
            {settings.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                <IconInstagram size={32} />
              </a>
            )}
            {settings.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                <IconFacebook size={32} />
              </a>
            )}
          </div>
          <p className="social-handle">{settings.instagram || '@flyy_360'}</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} FLYY 360 Raw & Reel. All Rights Reserved.</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
