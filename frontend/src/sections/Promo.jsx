import { Link } from 'react-router-dom';

export default function Promo({ content = {} }) {
  return (
    <section className="promo-banner">
      <div className="container promo-banner-inner">
        <h2 className="promo-banner-title">
          {content.promoTitle || 'MAKE YOUR EVENT UNFORGETTABLE'}
        </h2>
        <p className="promo-banner-text">
          {content.promoText || 'Bring the energy, excitement and VIP experience of FLYY 360 to your next event.'}
        </p>
        <div className="promo-banner-badge">
          {content.promoDiscount || '10% OFF FIRST BOOKING'}
        </div>
        <Link to="/contact" className="btn btn-primary btn-pill">
          BOOK YOUR EXPERIENCE
        </Link>
      </div>
    </section>
  );
}
