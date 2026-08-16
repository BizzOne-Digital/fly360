import { IconCheck } from '../components/icons';
import { resolveServices } from '../utils/defaultData';

const SERVICE_IMAGES = {
  '360-booth': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
  social: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
  'booth-option': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
};

function ServiceCard({ service }) {
  const isComingSoon = service.price?.toLowerCase().includes('coming');
  const imageUrl = service.imageUrl || SERVICE_IMAGES[service.category] || SERVICE_IMAGES['360-booth'];

  return (
    <div className="service-card">
      <div className="service-card-image">
        <img src={imageUrl} alt={service.title} loading="lazy" />
      </div>
      <div className="service-card-body">
        <h3 className="service-card-title">{service.title}</h3>
        {service.price && (
          <div className="service-card-price">
            {service.priceLabel && <span className="service-price-label">{service.priceLabel} </span>}
            <span className={isComingSoon ? 'service-price-coming' : 'service-price-value'}>
              {service.price}
            </span>
          </div>
        )}
        {service.description && (
          <p className="service-card-desc">{service.description}</p>
        )}
        {service.features?.length > 0 && (
          <ul className="service-card-features">
            {service.features.map((f) => (
              <li key={f}>
                <IconCheck size={14} />
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Services({ services = [], showHeader = true }) {
  const allServices = resolveServices(services);
  const mainServices = allServices.filter((s) => s.category !== 'booth-option');
  const boothOptions = allServices.filter((s) => s.category === 'booth-option');

  return (
    <section className="section services-section">
      <div className="container">
        {showHeader && (
          <>
            <h2 className="section-title">OUR SERVICES</h2>
            <p className="section-subtitle">
              Premium operator-assisted 360 photo booth and social photography experiences for every occasion.
            </p>
          </>
        )}

        <div className="services-grid">
          {mainServices.map((service) => (
            <ServiceCard key={service._id || service.title} service={service} />
          ))}
        </div>

        {boothOptions.length > 0 && (
          <div className="booth-options-block">
            <h3 className="booth-options-title">BOOTH OPTIONS</h3>
            <div className="booth-options-grid">
              {boothOptions.map((service) => (
                <ServiceCard key={service._id || service.title} service={service} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
