import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { t, routePaths, language } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const paths = routePaths[language];
  const isHome = location.pathname === paths.home;
  // Solid (cream) nav once scrolled or on any non-home page; transparent over the hero.
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navColor = solid ? '#11313E' : '#ffffff';
  const links = [
    { to: paths.home, label: t('home') },
    { to: paths.kayak, label: t('kayakRentals') },
    { to: paths.paddle, label: t('paddleBoardNav') },
    { to: paths.activities, label: t('seaActivities') },
  ];

  const linkStyle = (to: string): React.CSSProperties => ({
    fontFamily: "'Hanken Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: '15px',
    textDecoration: 'none',
    color: navColor,
    opacity: location.pathname === to ? 1 : 0.62,
    transition: 'color .35s ease',
  });

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(14px,2vw,20px) clamp(20px,6vw,96px)',
          background: solid ? 'rgba(246,243,236,0.92)' : 'transparent',
          boxShadow: solid ? '0 1px 0 rgba(17,49,62,0.10)' : 'none',
          backdropFilter: 'saturate(140%) blur(10px)',
          WebkitBackdropFilter: 'saturate(140%) blur(10px)',
          transition: 'background .35s ease, box-shadow .35s ease',
        }}
      >
        <Link
          to={paths.home}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: navColor, transition: 'color .35s ease' }}
        >
          <img
            src="/logo.png"
            alt="OpenSea Almuñécar logo"
            width={42}
            height={42}
            style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 10px rgba(17,49,62,.18)' }}
          />
          <span className="font-display" style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-.01em' }}>
            OPEN SEA
          </span>
        </Link>

        <div className="os-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px,2.4vw,40px)' }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} style={linkStyle(l.to)}>
              {l.label}
            </Link>
          ))}
          <LanguageSelector tone={solid ? 'dark' : 'light'} />
        </div>

        <button
          className="os-burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menú"
          aria-expanded={menuOpen}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: 'block', width: 26, height: 2.5, background: navColor, borderRadius: 2, transition: '.3s' }} />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div
          className="os-mobile-menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: '#0A5E74',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '8px',
            padding: '0 clamp(28px,8vw,64px)',
            animation: 'osFadeUp .35s ease',
          }}
        >
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="font-display"
              style={{
                fontWeight: 800,
                fontSize: 'clamp(34px,9vw,52px)',
                letterSpacing: '-.02em',
                color: '#fff',
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: i < links.length - 1 ? '1px solid rgba(255,255,255,.16)' : 'none',
              }}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar"
            style={{ position: 'absolute', top: 24, right: 'clamp(20px,6vw,40px)', border: 'none', background: 'transparent', color: '#fff', fontSize: 34, lineHeight: 1, cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
