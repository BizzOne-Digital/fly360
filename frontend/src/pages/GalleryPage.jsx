import Gallery from '../sections/Gallery';

export default function GalleryPage() {
  return (
    <main className="page-main">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">GALLERY / PORTFOLIO</h1>
          <p className="page-subtitle">Moments captured. Experiences shared.</p>
        </div>
      </section>
      <Gallery />
    </main>
  );
}
