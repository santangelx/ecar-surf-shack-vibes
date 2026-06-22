import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { MAPS_DIRECTIONS_URL, BUSINESS } from '@/lib/site';

const Footer = () => {
  const { t, routePaths, language } = useLanguage();
  const paths = routePaths[language];
  const year = new Date().getFullYear();

  const linkStyle: React.CSSProperties = { color: 'rgba(255,255,255,.78)', textDecoration: 'none', fontSize: 15 };
  const headingStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '.2em',
    textTransform: 'uppercase',
    color: '#6FC5DC',
    margin: '0 0 18px',
  };

  return (
    <footer style={{ background: '#0A2832', color: 'rgba(255,255,255,.78)', padding: 'clamp(56px,8vw,96px) clamp(20px,6vw,96px) clamp(32px,4vw,48px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 'clamp(32px,4vw,56px)' }}>
          <div>
            <div className="font-display" style={{ fontWeight: 800, fontSize: 26, color: '#fff', letterSpacing: '-.01em', marginBottom: 16 }}>
              OPEN SEA
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0, maxWidth: '38ch' }}>{t('description')}</p>
          </div>
          <div>
            <h4 className="font-display" style={headingStyle}>{t('quickLinks')}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><Link to={paths.kayak} style={linkStyle}>{t('kayakRentals')}</Link></li>
              <li><Link to={paths.paddle} style={linkStyle}>{t('paddleBoardNav')}</Link></li>
              <li><Link to={paths.activities} style={linkStyle}>{t('seaActivities')}</Link></li>
              <li>
                <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>{t('location')}</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display" style={headingStyle}>{t('businessHours')}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <li style={{ fontSize: 15 }}>
                <span style={{ display: 'block', color: '#fff', fontWeight: 600 }}>{t('everyday')}</span>{BUSINESS.opens} – {BUSINESS.closes}
              </li>
              <li style={{ fontSize: 15 }}>{t('address')}</li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.14)', marginTop: 'clamp(40px,5vw,64px)', paddingTop: 24, textAlign: 'center', fontSize: 14 }}>
          © {year} OpenSea Kayak &amp; Paddle Surf. {t('allRightsReserved')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
