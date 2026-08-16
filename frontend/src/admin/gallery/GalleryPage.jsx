import { useState, useEffect, useRef } from 'react';
import { galleryAPI } from '../../services/api';

const CATEGORIES = ['all', 'weddings', 'parties', 'corporate', '360-videos', 'social-shoots'];

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const fetchGallery = async () => {
    try {
      const res = await galleryAPI.getAll();
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGallery(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('media', file);
    formData.append('title', file.name);
    formData.append('category', 'all');

    try {
      const res = await galleryAPI.create(formData);
      setItems((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      await galleryAPI.delete(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePublish = async (item) => {
    const formData = new FormData();
    formData.append('isPublished', !item.isPublished);
    try {
      const res = await galleryAPI.update(item._id, formData);
      setItems((prev) => prev.map((i) => i._id === item._id ? res.data : i));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryChange = async (item, category) => {
    const formData = new FormData();
    formData.append('category', category);
    try {
      const res = await galleryAPI.update(item._id, formData);
      setItems((prev) => prev.map((i) => i._id === item._id ? res.data : i));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Gallery</h1>
        <div>
          <input ref={fileRef} type="file" accept="image/*,video/*" onChange={handleUpload} style={{ display: 'none' }} />
          <button className="btn btn-primary" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? 'Uploading...' : '+ Upload Media'}
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
      ) : items.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: 60 }}>
          <p style={{ color: 'var(--text-muted)' }}>No gallery items yet. Upload your first image or video.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {items.map((item) => (
            <div key={item._id} className="admin-card" style={{ padding: 12 }}>
              <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3', marginBottom: 12, background: '#0a0a0f' }}>
                {item.mediaType === 'video' ? (
                  <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <input
                className="form-input"
                value={item.title}
                onChange={(e) => setItems((prev) => prev.map((i) => i._id === item._id ? { ...i, title: e.target.value } : i))}
                onBlur={async () => {
                  const formData = new FormData();
                  formData.append('title', item.title);
                  await galleryAPI.update(item._id, formData);
                }}
                style={{ fontSize: '0.8rem', marginBottom: 8 }}
              />
              <select
                className="form-select"
                value={item.category}
                onChange={(e) => handleCategoryChange(item, e.target.value)}
                style={{ fontSize: '0.75rem', marginBottom: 8 }}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => handleTogglePublish(item)}
                  style={{ fontSize: '0.7rem', color: item.isPublished ? '#4ade80' : 'var(--text-muted)' }}
                >
                  {item.isPublished ? 'Published' : 'Draft'}
                </button>
                <button onClick={() => handleDelete(item._id)} style={{ fontSize: '0.7rem', color: '#f87171' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
