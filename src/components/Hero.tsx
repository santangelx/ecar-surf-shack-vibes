
import React from 'react';
import { ArrowDown } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center bg-hero-pattern bg-cover bg-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent"></div>
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in" style={{ fontFamily: 'monospace' }}>
            <span className="block text-ocean">OPEN</span>
            <span className="text-ocean">SEA</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 animate-fade-in">
            {t('tagline')}
          </h2>
          <p className="text-lg text-gray-700 mb-8 animate-fade-in">
            {t('description')}
          </p>
        </div>
      </div>
      <a 
        href="#services"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-ocean hover:text-ocean-dark transition-colors"
      >
        <ArrowDown className="h-10 w-10 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
