import { HIGHLIGHTS } from '../utils/constants';
import { HighlightIcon } from '../components/HighlightIcon';

export default function Highlights() {
  return (
    <section className="highlights-bar">
      <div className="container highlights-grid">
        {HIGHLIGHTS.map((item) => (
          <div key={item.title} className="highlight-item">
            <div className="highlight-icon">
              <HighlightIcon name={item.icon} size={28} />
            </div>
            <div>
              <h3 className="highlight-title">{item.title}</h3>
              <p className="highlight-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
