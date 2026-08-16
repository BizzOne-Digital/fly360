import { useState, useEffect } from 'react';
import { serviceAPI } from '../../services/api';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', price: '', priceLabel: 'Starting at', features: '', category: 'general' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serviceAPI.getAll().then((res) => {
      setServices(res.data);
      setLoading(false);
    });
  }, []);

  const resetForm = () => {
    setEditing(null);
    setForm({ title: '', description: '', price: '', priceLabel: 'Starting at', features: '', category: 'general' });
    setImageFile(null);
    setImagePreview('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'features') {
        formData.append('features', JSON.stringify(val.split('\n').filter(Boolean)));
      } else {
        formData.append(key, val);
      }
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editing) {
        const res = await serviceAPI.update(editing, formData);
        setServices((prev) => prev.map((s) => s._id === editing ? res.data : s));
      } else {
        const res = await serviceAPI.create(formData);
        setServices((prev) => [...prev, res.data]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    await serviceAPI.delete(id);
    setServices((prev) => prev.filter((s) => s._id !== id));
  };

  const startEdit = (service) => {
    setEditing(service._id);
    setForm({
      title: service.title,
      description: service.description || '',
      price: service.price,
      priceLabel: service.priceLabel || '',
      features: (service.features || []).join('\n'),
      category: service.category || 'general',
    });
    setImageFile(null);
    setImagePreview(service.imageUrl || '');
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 24 }}>Services</h1>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>
          {editing ? 'Edit Service' : 'Add Service'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Price</label>
            <input className="form-input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Features (one per line)</label>
            <textarea className="form-textarea" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={4} />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="general">General</option>
              <option value="360-booth">360 Booth</option>
              <option value="social">Social Photography</option>
              <option value="booth-option">Booth Option</option>
            </select>
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Image</label>
            {imagePreview && (
              <div style={{ marginBottom: 12, borderRadius: 8, overflow: 'hidden', maxWidth: 240 }}>
                <img src={imagePreview} alt="Service preview" style={{ width: '100%', display: 'block' }} />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Update' : 'Add'} Service</button>
          {editing && <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
        </div>
      </div>

      {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p> : (
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr><th>Image</th><th>Title</th><th>Price</th><th>Category</th><th>Published</th><th></th></tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  <td>
                    {s.imageUrl ? (
                      <img src={s.imageUrl} alt={s.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} />
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>No image</span>
                    )}
                  </td>
                  <td>{s.title}</td>
                  <td>{s.price}</td>
                  <td>{s.category}</td>
                  <td>{s.isPublished ? 'Yes' : 'No'}</td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => startEdit(s)} style={{ color: 'var(--accent-blue)', fontSize: '0.8rem' }}>Edit</button>
                    <button onClick={() => handleDelete(s._id)} style={{ color: '#f87171', fontSize: '0.8rem' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
