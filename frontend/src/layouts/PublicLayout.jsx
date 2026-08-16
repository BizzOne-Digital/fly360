import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { useSiteData } from '../hooks/useSiteData';
import LoadingScreen from '../components/LoadingScreen';

export default function PublicLayout() {
  const siteData = useSiteData();

  if (siteData.loading) return <LoadingScreen />;

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet context={siteData} />
      <Footer settings={siteData.settings} />
    </>
  );
}
