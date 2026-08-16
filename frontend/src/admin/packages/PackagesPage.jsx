import { useState, useEffect } from 'react';
import { packageAPI } from '../../services/api';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '', duration: '', price: '', description: '', features: '',
    isFeatured: false, isPremium: false, isEnabled: true, ctaText: 'BOOK NOW',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    packageAPI.getAll().then((res) => {
      setPackages(res.data);
      setLoading(false);
    });
  }, []);

  const resetForm = () => {
    setEditing(null);
    setForm({ name: '', duration: '', price: '', description: '', features: '', isFeatured: false, isPremium: false, isEnabled: true, ctaText: 'BOOK NOW' });
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

    try {
      if (editing) {
        const res = await packageAPI.update(editing, formData);
        setPackages((prev) => prev.map((p) => p._id === editing ? res.data : p));
      } else {
        const res = await packageAPI.create(formData);
        setPackages((prev) => [...prev, res.data]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this package?')) return;
    await packageAPI.delete(id);
    setPackages((prev) => prev.filter((p) => p._id !== id));
  };

  const startEdit = (pkg) => {
    setEditing(pkg._id);
    setForm({
      name: pkg.name,
      duration: pkg.duration,
      price: pkg.price,
      description: pkg.description || '',
      features: (pkg.features || []).join('\n'),
      isFeatured: pkg.isFeatured,
      isPremium: pkg.isPremium,
      isEnabled: pkg.isEnabled,
      ctaText: pkg.ctaText || 'BOOK NOW',
    });
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 24 }}>Packages</h1>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>
          {editing ? 'Edit Package' : 'Add Package'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Duration</label>
            <input className="form-input" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Price</label>
            <input className="form-input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">CTA Text</label>
            <input className="form-input" value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Features (one per line)</label>
            <textarea className="form-textarea" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={4} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
            Featured (Most Popular)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
            <input type="checkbox" checked={form.isPremium} onChange={(e) => setForm({ ...form, isPremium: e.target.checked })} />
            Premium / Gold
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
            <input type="checkbox" checked={form.isEnabled} onChange={(e) => setForm({ ...form, isEnabled: e.target.checked })} />
            Enabled
          </label>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Update' : 'Add'} Package</button>
          {editing && <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
        </div>
      </div>

      {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p> : (
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Duration</th><th>Price</th><th>Featured</th><th>Enabled</th><th></th></tr>
            </thead>
            <tbody>
              {packages.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.duration}</td>
                  <td>{p.price}</td>
                  <td>{p.isFeatured ? '★' : ''}</td>
                  <td>{p.isEnabled ? 'Yes' : 'No'}</td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => startEdit(p)} style={{ color: 'var(--accent-blue)', fontSize: '0.8rem' }}>Edit</button>
                    <button onClick={() => handleDelete(p._id)} style={{ color: '#f87171', fontSize: '0.8rem' }}>Delete</button>
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
