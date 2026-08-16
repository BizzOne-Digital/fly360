import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};

export const useAuth = () => {
  const token = localStorage.getItem('flyy360_token');
  const isAuthenticated = !!token;

  const login = (token) => {
    localStorage.setItem('flyy360_token', token);
  };

  const logout = () => {
    localStorage.removeItem('flyy360_token');
    window.location.href = '/admin/login';
  };

  return { isAuthenticated, login, logout };
};
