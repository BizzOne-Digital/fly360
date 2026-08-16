import { useOutletContext } from 'react-router-dom';
import Contact from '../sections/Contact';
import Promo from '../sections/Promo';

export default function ContactPage() {
  const { content, settings, packages } = useOutletContext();

  return (
    <main className="page-main">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">CONTACT &amp; BOOKING</h1>
          <p className="page-subtitle">Request your FLYY 360 experience — we&apos;ll get back to you shortly.</p>
        </div>
      </section>
      <Promo content={content} />
      <Contact settings={settings} packages={packages} />
    </main>
  );
}
