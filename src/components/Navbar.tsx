
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-ocean-dark">OpenSea</a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#services" className="font-medium text-gray-700 hover:text-ocean transition-colors">{t('services')}</a>
            <a href="#prices" className="font-medium text-gray-700 hover:text-ocean transition-colors">{t('prices')}</a>
            <a href="#hours" className="font-medium text-gray-700 hover:text-ocean transition-colors">{t('hours')}</a>
            <a href="#location" className="font-medium text-gray-700 hover:text-ocean transition-colors">{t('location')}</a>
            <LanguageSelector />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageSelector />
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-4 p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a 
                href="#services" 
                className="font-medium text-gray-700 hover:text-ocean transition-colors px-3 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('services')}
              </a>
              <a 
                href="#prices" 
                className="font-medium text-gray-700 hover:text-ocean transition-colors px-3 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('prices')}
              </a>
              <a 
                href="#hours" 
                className="font-medium text-gray-700 hover:text-ocean transition-colors px-3 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('hours')}
              </a>
              <a 
                href="#location" 
                className="font-medium text-gray-700 hover:text-ocean transition-colors px-3 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('location')}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
