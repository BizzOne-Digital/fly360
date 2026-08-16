import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';
import Highlights from '../sections/Highlights';
import AboutPreview from '../sections/AboutPreview';
import HowItWorks from '../sections/HowItWorks';
import PackagesSection from '../sections/PackagesSection';
import GalleryPreview from '../sections/GalleryPreview';
import Testimonials from '../sections/Testimonials';
import Promo from '../sections/Promo';

export default function HomePage() {
  const { content, settings, packages, gallery } = useOutletContext();

  return (
    <main>
      <Hero content={content} settings={settings} />
      <Highlights />
      <AboutPreview content={content} />
      <HowItWorks />
      <PackagesSection packages={packages} addons={content.addons} />
      <GalleryPreview items={gallery} preview />
      <Testimonials />
      <Promo content={content} />
    </main>
  );
}
