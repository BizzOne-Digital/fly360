import { Link } from 'react-router-dom';
import { IconCheck, getAddonIcon } from '../components/icons';
import { ADDONS } from '../utils/constants';
import { resolvePackages } from '../utils/defaultData';

const PACKAGE_THEMES = [
  { key: 'starter', glow: 'blue', borderColor: '#2563eb' },
  { key: 'standard', glow: 'purple', borderColor: '#7c3aed' },
  { key: 'premium', glow: 'gold', borderColor: '#d4af37' },
];

function getTheme(index, pkg) {
  if (pkg.isPremium) return PACKAGE_THEMES[2];
  if (pkg.isFeatured) return PACKAGE_THEMES[1];
  return PACKAGE_THEMES[index % 3];
}

function PackageCard({ pkg, index }) {
  const theme = getTheme(index, pkg);

  return (
    <div className={`package-card package-card--${theme.glow}`}>
      <h3 className="package-name">{pkg.name}</h3>
      <div className="package-duration">{pkg.duration}</div>
      <div className="package-price">{pkg.price}</div>
      {pkg.description && <p className="package-desc">{pkg.description}</p>}
      {pkg.features?.length > 0 && (
        <ul className="package-features">
          {pkg.features.map((f) => (
            <li key={f}>
              <IconCheck size={14} />
              {f}
            </li>
          ))}
        </ul>
      )}
      <Link
        to="/contact"
        className={`btn btn-pill package-btn package-btn--${theme.glow}`}
      >
        {pkg.ctaText || 'BOOK NOW'}
      </Link>
    </div>
  );
}

export default function PackagesSection({ packages = [], addons, showAddons = true, title = 'OUR PACKAGES' }) {
  const displayPackages = packages.length > 0
    ? packages.filter((p) => p.isEnabled !== false)
    : [];

  const items = displayPackages.length > 0 ? displayPackages : resolvePackages();
  const addonItems = Array.isArray(addons) && addons.length > 0 ? addons : ADDONS;

  return (
    <section className="packages-section section">
      <div className="container">
        <h2 className="packages-heading">{title}</h2>
        <p className="packages-subheading">
          Choose the perfect experience for your event. All packages include operator assistance and digital sharing.
        </p>

        <div className={`packages-layout ${!showAddons ? 'packages-layout--full' : ''}`}>
          <div className="packages-grid">
            {items.map((pkg, i) => (
              <PackageCard key={pkg._id || pkg.name} pkg={pkg} index={i} />
            ))}
          </div>

          {showAddons && (
            <div className="addons-sidebar">
              <h3 className="addons-title">ADD-ONS &amp; EXTRAS</h3>
              <ul className="addons-list">
                {addonItems.map((addon) => {
                  const Icon = getAddonIcon(addon);
                  return (
                    <li key={addon} className="addons-item">
                      <Icon size={18} />
                      <span>{addon}</span>
                    </li>
                  );
                })}
                <li className="addons-item">
                  <span className="addons-more">+ More Lighting</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
