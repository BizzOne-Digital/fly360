import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Services from '../sections/Services';
import PackagesSection from '../sections/PackagesSection';

export default function ServicesPage() {
  const { services, packages } = useOutletContext();

  return (
    <main className="page-main">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">SERVICES</h1>
          <p className="page-subtitle">
            Operator-assisted 360 booths, social photography, and premium event production.
          </p>
        </div>
      </section>

      <Services services={services} showHeader={false} />
      <PackagesSection packages={packages} showAddons={false} title="PACKAGE OPTIONS" />

      <section className="section section-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to elevate your event?</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 24px' }}>
            Book your FLYY 360 experience today.
          </p>
          <Link to="/contact" className="btn btn-primary btn-pill">BOOK NOW</Link>
        </div>
      </section>
    </main>
  );
}
