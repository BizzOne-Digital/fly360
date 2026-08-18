import { useState, useEffect } from 'react';
import { contentAPI } from '../../services/api';

const CONTENT_FIELDS = [
  { key: 'heroTagline', label: 'Hero Tagline', section: 'hero' },
  { key: 'heroTitle', label: 'Hero Title', section: 'hero' },
  { key: 'heroHighlight', label: 'Hero Highlight', section: 'hero' },
  { key: 'heroHeadline', label: 'Hero Headline', section: 'hero' },
  { key: 'heroSubtitle', label: 'Hero Subtitle', section: 'hero' },
  { key: 'heroDescription', label: 'Hero Description', section: 'hero', type: 'textarea' },
  { key: 'promoBadge', label: 'Promo Badge', section: 'hero' },
  { key: 'aboutHeading', label: 'About Heading', section: 'about', type: 'textarea' },
  { key: 'aboutContent', label: 'About Content', section: 'about', type: 'textarea' },
  { key: 'promoTitle', label: 'Promo Title', section: 'promo' },
  { key: 'promoText', label: 'Promo Text', section: 'promo', type: 'textarea' },
  { key: 'promoDiscount', label: 'Promo Discount', section: 'promo' },
  { key: 'addons', label: 'Add-Ons & Extras (comma-separated)', section: 'addons', type: 'list' },
];

export default function ContentPage() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    contentAPI.getAll().then((res) => {
      setContent(res.data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const payload = { ...content };
      if (typeof payload.addons === 'string') {
        payload.addons = payload.addons.split(',').map((v) => v.trim()).filter(Boolean);
      }
      await contentAPI.update(payload);
      setMessage('Content saved successfully!');
    } catch (err) {
      setMessage('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleHeroUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('media', file);

    try {
      const res = await contentAPI.uploadHeroMedia(formData);
      setContent((prev) => ({ ...prev, heroMedia: res.data }));
      setMessage('Hero media updated!');
    } catch (err) {
      setMessage('Upload failed');
    }
  };

  const handleAboutImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await contentAPI.uploadImage('aboutImage', formData);
      setContent((prev) => ({ ...prev, aboutImage: res.data }));
      setMessage('About section image updated!');
    } catch (err) {
      setMessage('Upload failed');
    }
  };

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Loading...</p>;

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 24 }}>Website Content</h1>

      {message && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(34,197,94,0.1)',
          border: '1px solid rgba(34,197,94,0.3)',
          borderRadius: 'var(--radius-sm)',
          color: '#4ade80',
          fontSize: '0.85rem',
          marginBottom: 20,
        }}>
          {message}
        </div>
      )}

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>Hero Media</h3>
        {content.heroMedia && (
          <div style={{ marginBottom: 16, borderRadius: 8, overflow: 'hidden', maxWidth: 400 }}>
            {content.heroMedia.type === 'video' ? (
              <video src={content.heroMedia.url} controls style={{ width: '100%' }} />
            ) : (
              <img src={content.heroMedia.url} alt="Hero" style={{ width: '100%' }} />
            )}
          </div>
        )}
        <input type="file" accept="image/*,video/*" onChange={handleHeroUpload} />
      </div>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>About Section Image</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>
          Shown on the Home page "About" preview and the full About page.
        </p>
        {content.aboutImage?.url && (
          <div style={{ marginBottom: 16, borderRadius: 8, overflow: 'hidden', maxWidth: 400 }}>
            <img src={content.aboutImage.url} alt="About section" style={{ width: '100%' }} />
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleAboutImageUpload} />
      </div>

      <div className="admin-card">
        {CONTENT_FIELDS.map((field) => (
          <div className="form-group" key={field.key}>
            <label className="form-label">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                className="form-textarea"
                value={content[field.key] || ''}
                onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                rows={3}
              />
            ) : field.type === 'list' ? (
              <textarea
                className="form-textarea"
                value={Array.isArray(content[field.key]) ? content[field.key].join(', ') : (content[field.key] || '')}
                onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                rows={3}
              />
            ) : (
              <input
                className="form-input"
                value={content[field.key] || ''}
                onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
              />
            )}
          </div>
        ))}

        <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ marginTop: 16 }}>
          {saving ? 'Saving...' : 'Save Content'}
        </button>
      </div>
    </div>
  );
}
