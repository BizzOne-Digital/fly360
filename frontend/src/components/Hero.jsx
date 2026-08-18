import { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoModal from './VideoModal';
import { IconPlay } from './icons';

const DEFAULT_HERO_BG = '/hero.png';

export default function Hero({ content = {}, settings = {} }) {
  const [videoOpen, setVideoOpen] = useState(false);

  const heroMedia = content.heroMedia;
  const bgUrl = heroMedia?.type === 'image' ? heroMedia.url : DEFAULT_HERO_BG;
  const videoUrl = settings.promoVideoUrl || (heroMedia?.type === 'video' ? heroMedia?.url : '');

  return (
    <section className="hero-section">
      <div className="hero-bg" style={{ backgroundImage: `url(${bgUrl})` }} />
      {heroMedia?.type === 'video' && (
        <video className="hero-video" autoPlay muted loop playsInline src={heroMedia.url} />
      )}
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-title-main">{content.heroTitle || 'FLYY 360'}</span>
            <span className="hero-title-bracket">{content.heroHighlight || 'RAW & REEL'}</span>
          </h1>

          <h2 className="hero-headline">
            <span className="hero-script">An Experience</span>
            <span className="hero-caps">YOU&apos;LL NEVER FORGET</span>
          </h2>

          <div className="hero-pill">
            {content.heroSubtitle || 'PHOTO BOOTH & SOCIAL PHOTOGRAPHY'}
          </div>

          <p className="hero-desc">
            {content.heroDescription || 'We are an operator-assisted 360 photo booth and social photography company delivering immersive, shareable experiences for special occasions, weddings, schools, corporate events, brand activations, and unforgettable celebrations.'}
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary btn-pill">
              BOOK NOW
            </Link>
            <Link to="/services" className="btn btn-outline-gold btn-pill">
              LEARN MORE
            </Link>
          </div>

          {videoUrl && (
            <button className="hero-video-btn" onClick={() => setVideoOpen(true)}>
              <span className="hero-video-thumb">
                <video src={videoUrl} muted loop autoPlay playsInline />
                <span className="hero-video-thumb-play"><IconPlay size={12} /></span>
              </span>
              See The Experience
            </button>
          )}
        </div>

        <div className="hero-badge">
          <div className="promo-circle">
            <span className="promo-circle-top">GRAND OPENING</span>
            <span className="promo-circle-special">SPECIAL</span>
            <span className="promo-circle-off">10% OFF</span>
            <span className="promo-circle-bottom">YOUR FIRST BOOKING EVENT</span>
          </div>
        </div>
      </div>

      {videoOpen && <VideoModal url={videoUrl} onClose={() => setVideoOpen(false)} />}
    </section>
  );
}
