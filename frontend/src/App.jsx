import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/dashboard/Dashboard';
import BookingsPage from './admin/bookings/BookingsPage';
import GalleryAdminPage from './admin/gallery/GalleryPage';
import ServicesAdminPage from './admin/services/ServicesPage';
import PackagesAdminPage from './admin/packages/PackagesPage';
import ContentPage from './admin/content/ContentPage';
import SettingsPage from './admin/settings/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="gallery" element={<GalleryAdminPage />} />
        <Route path="services" element={<ServicesAdminPage />} />
        <Route path="packages" element={<PackagesAdminPage />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
