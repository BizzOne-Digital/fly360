const TESTIMONIALS = [
  {
    name: 'Summer Hudson',
    role: 'The Bride',
    event: '360 Photo Booth | Wedding Reception',
    quote: 'FLYY 360 was Wonderful, Everyone at my wedding had a great time. Flyy 360 were so professional. It became the life of the event. My guests were on the 360 machine more than 2 times a piece and my guests wanted to book them for some of their future events. Overall it was an amazing experience, and when it is time for me to do another event "FLYY 360" will definitely be a part of the entertainment for sure.',
  },
  {
    name: 'Aj Jones (Da Precha)',
    role: 'of Thru Christ Music',
    event: 'Promotional Branding | Social Shoot',
    quote: 'I booked FLYY 360 and they went above and beyond to capture the essence of my event. The photographer caught pictures from so many angles, and point of views, that I could re-engage myself into the screen everytime I look at the photos. I think the best pictures are the off guard ones, and they were excellent in capturing the rare beauty of the day; with smiles and laughs from everyone who came out. They even caught wonderful motion pictures. I highly recommend them for your next event. It will exceed your expectations.',
  },
  {
    name: 'Chef Russell Steele',
    role: 'from The Crossing at Callahan in Rome, Georgia',
    event: 'Promotional Branding | Social Shoot',
    quote: 'I am a chef from Rome Georgia. I recently started a business alongside my lovely sisters. We have an event venue. We reached out to book FLYY 360 for one of our dinner events. We needed a photographer to capture some moments that we could use for content, social media platforms and our website. FLYY 360 went above and beyond what was asked! The photos were beautiful. They took intentional photos, off guard photos and videos. After the event they went above and beyond what was asked during editing. All photos and videos were delivered to us with the highest resolution. You can tell FLYY 360 loves what they do. I will recommend them to anyone. We will definitely be using their services again in the future!',
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
                <span className="testimonial-name">{t.name}{t.role ? `, ${t.role}` : ''}</span>
                <span className="testimonial-event">{t.event}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
