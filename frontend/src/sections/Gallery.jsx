import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { GALLERY_FILTERS } from '../utils/constants';
import { resolveGallery } from '../utils/defaultData';

const PLACEHOLDER_IMAGES = [
  { id: '1', title: 'Wedding Celebration', category: 'weddings', mediaType: 'image', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80' },
  { id: '2', title: 'Birthday Party', category: 'parties', mediaType: 'image', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80' },
  { id: '3', title: 'Corporate Event', category: 'corporate', mediaType: 'image', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
  { id: '4', title: 'Prom Night', category: 'parties', mediaType: 'image', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80' },
  { id: '5', title: 'Brand Activation', category: 'corporate', mediaType: 'image', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80' },
  { id: '6', title: 'Social Shoot', category: 'social-shoots', mediaType: 'image', url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80' },
];

export default function Gallery({ items: itemsProp }) {
  const context = useOutletContext();
  const items = resolveGallery(itemsProp ?? context?.gallery ?? []);
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const galleryItems = items;
  const filtered = filter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  return (
    <section className="section gallery-full-section">
      <div className="container">

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
          marginBottom: 40,
        }}>
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                border: filter === f.key ? '1px solid var(--accent-blue)' : '1px solid var(--border-glow)',
                background: filter === f.key ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                color: filter === f.key ? 'var(--accent-blue-light)' : 'var(--text-secondary)',
                transition: 'all 0.3s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {filtered.map((item) => (
            <div
              key={item._id || item.id}
              onClick={() => setLightbox(item)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                aspectRatio: '4/3',
                cursor: 'pointer',
              }}
              className="gallery-item"
            >
              {item.mediaType === 'video' ? (
                <video
                  src={item.url}
                  muted
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
              )}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: 16,
                opacity: 0,
                transition: 'opacity 0.3s',
              }}
              className="gallery-overlay"
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
            No items in this category yet.
          </p>
        )}
      </div>

      {lightbox && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              color: 'white',
              fontSize: '1.5rem',
              zIndex: 10,
            }}
          >
            ✕
          </button>
          {lightbox.mediaType === 'video' ? (
            <video src={lightbox.url} controls autoPlay style={{ maxWidth: '90vw', maxHeight: '85vh' }} />
          ) : (
            <img
              src={lightbox.url}
              alt={lightbox.title}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }}
            />
          )}
        </div>
      )}

      <style>{`
        .gallery-item:hover img,
        .gallery-item:hover video {
          transform: scale(1.05);
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
