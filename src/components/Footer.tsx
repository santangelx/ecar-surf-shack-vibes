
import React from 'react';
import { Clock, MapPin } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-ocean-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">OpenSea</h3>
            <p className="mb-6">
              {t('description')}
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-ocean-light transition-colors">{t('ourServices')}</a>
              </li>
              <li>
                <a href="#prices" className="hover:text-ocean-light transition-colors">{t('ourPrices')}</a>
              </li>
              <li>
                <a href="#hours" className="hover:text-ocean-light transition-colors">{t('businessHours')}</a>
              </li>
              <li>
                <a href="#location" className="hover:text-ocean-light transition-colors">{t('findUs')}</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">{t('businessHours')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-ocean-light" />
                <div>
                  <p className="font-medium">{t('everyday')}</p>
                  <p className="text-sm">10:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-ocean-light" />
                <span>{t('address')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} OpenSea Kayak & Paddle Surf. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
