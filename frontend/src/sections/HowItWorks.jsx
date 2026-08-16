const STEPS = [
  {
    step: '01',
    title: 'BOOK YOUR DATE',
    description: 'Pick your package and reserve your event date in minutes — no deposits headaches, no hidden fees.',
  },
  {
    step: '02',
    title: 'WE CUSTOMIZE YOUR SETUP',
    description: 'Backdrops, props, lighting, and branded overlays tailored to your event theme and colors.',
  },
  {
    step: '03',
    title: 'WE SHOW UP & SET UP',
    description: 'Our operator arrives early, sets up the full experience, and handles everything on-site.',
  },
  {
    step: '04',
    title: 'YOUR GUESTS SHARE THE FUN',
    description: 'Guests strike a pose, and every video and photo is instantly ready to share on social media.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section how-it-works">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>HOW IT WORKS</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
          Booking your FLYY 360 experience is simple, fast, and stress-free from start to finish.
        </p>
        <div className="how-it-works-grid">
          {STEPS.map((item) => (
            <div key={item.step} className="how-it-works-card">
              <span className="how-it-works-number">{item.step}</span>
              <h3 className="how-it-works-title">{item.title}</h3>
              <p className="how-it-works-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
