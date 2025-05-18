
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import ReservationDialog from './ReservationDialog';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center bg-hero-pattern bg-cover bg-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent"></div>
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
            <span className="block text-turquoise">OPEN</span>
            <span className="text-coral-custom">SEA</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 animate-fade-in">
            {t('tagline')}
          </h2>
          <p className="text-lg text-gray-700 mb-8 animate-fade-in">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <ReservationDialog>
              <Button className="bg-turquoise hover:bg-turquoise/90 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-colors duration-200">
                {t('reserveButton')}
              </Button>
            </ReservationDialog>
            <Button 
              className="bg-coral-custom hover:bg-coral-custom/90 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-colors duration-200"
              onClick={() => {
                document.getElementById('prices')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('viewPricesButton')}
            </Button>
          </div>
        </div>
      </div>
      <a 
        href="#services"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-turquoise hover:text-turquoise/80 transition-colors"
      >
        <ArrowDown className="h-10 w-10 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
