import { useState, useEffect } from 'react';
import { contentAPI, serviceAPI, packageAPI, galleryAPI } from '../services/api';
import {
  mergeContent,
  mergeSettings,
  resolveServices,
  resolvePackages,
  resolveGallery,
} from '../utils/defaultData';

export function useSiteData() {
  const [content, setContent] = useState(mergeContent());
  const [settings, setSettings] = useState(mergeSettings());
  const [services, setServices] = useState(resolveServices());
  const [packages, setPackages] = useState(resolvePackages());
  const [gallery, setGallery] = useState(resolveGallery());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, settingsRes, servicesRes, packagesRes, galleryRes] = await Promise.all([
          contentAPI.getAll(),
          contentAPI.getSettings(),
          serviceAPI.getAll({ published: 'true' }),
          packageAPI.getAll({ enabled: 'true' }),
          galleryAPI.getAll({ published: 'true' }),
        ]);
        setContent(mergeContent(contentRes.data));
        setSettings(mergeSettings(settingsRes.data));
        setServices(resolveServices(servicesRes.data));
        setPackages(resolvePackages(packagesRes.data));
        setGallery(resolveGallery(galleryRes.data));
      } catch (err) {
        console.warn('Using default site content (API unavailable):', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { content, settings, services, packages, gallery, loading };
}
