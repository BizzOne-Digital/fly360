const TESTIMONIALS = [
  {
    name: 'Ashley R.',
    event: 'Wedding Reception',
    quote: 'FLYY 360 was the highlight of our reception. The operator kept the line moving and every guest walked away with a video they loved. Booking again for our anniversary!',
  },
  {
    name: 'Marcus T.',
    event: 'Corporate Brand Activation',
    quote: 'Professional from setup to breakdown. The custom branded overlay made our activation look premium, and the social shares gave us huge reach that week.',
  },
  {
    name: 'Priya S.',
    event: 'Sweet 16',
    quote: 'My daughter and her friends did not want to leave the booth all night. Lighting, props, everything was on point. Worth every penny.',
  },
];

export default function Testimonials() {
  return (
    <section className="section section-dark testimonials-section">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>WHAT OUR CLIENTS SAY</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
          Real feedback from real events across weddings, parties, schools, and corporate activations.
        </p>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card">
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-event">{t.event}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
