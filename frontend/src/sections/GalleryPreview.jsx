import { Link } from 'react-router-dom';
import { resolveGallery } from '../utils/defaultData';

export default function GalleryPreview({ items = [], preview = true }) {
  const galleryItems = resolveGallery(items).slice(0, 5);

  return (
    <section className="gallery-preview-section section">
      <div className="container">
        <h2 className="gallery-preview-heading">GALLERY / PORTFOLIO</h2>

        <div className="gallery-preview-grid">
          {galleryItems.map((item) => (
            <div key={item._id || item.id} className="gallery-preview-item">
              {item.mediaType === 'video' ? (
                <video src={item.url} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <img src={item.url} alt={item.title} loading="lazy" />
              )}
            </div>
          ))}
        </div>

        {preview && (
          <div className="gallery-preview-cta">
            <Link to="/gallery" className="btn btn-outline-blue btn-pill btn-wide">
              VIEW FULL GALLERY
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
