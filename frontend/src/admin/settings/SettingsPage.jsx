import { useState, useEffect } from 'react';
import { contentAPI } from '../../services/api';

const SETTING_FIELDS = [
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'location', label: 'Location' },
  { key: 'instagram', label: 'Instagram Handle' },
  { key: 'instagramUrl', label: 'Instagram URL' },
  { key: 'facebookUrl', label: 'Facebook URL' },
  { key: 'promoVideoUrl', label: 'Promo Video URL' },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    contentAPI.getSettings().then((res) => {
      setSettings(res.data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await contentAPI.updateSettings(settings);
      setMessage('Settings saved successfully!');
    } catch (err) {
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Loading...</p>;

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 24 }}>Settings</h1>

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

      <div className="admin-card">
        {SETTING_FIELDS.map((field) => (
          <div className="form-group" key={field.key}>
            <label className="form-label">{field.label}</label>
            <input
              className="form-input"
              value={settings[field.key] || ''}
              onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
            />
          </div>
        ))}

        <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ marginTop: 16 }}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
