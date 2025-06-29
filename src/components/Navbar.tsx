import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, routePaths, language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/' || 
                    location.pathname === '/es' || 
                    location.pathname === '/fr';

  const navLinks = [
    { href: routePaths[language].home, label: t('home'), isRoute: true },
    { href: routePaths[language].kayak, label: t('kayakRentals'), isRoute: true },
    { href: routePaths[language].paddle, label: t('paddleBoardNav'), isRoute: true },
    { href: routePaths[language].activities, label: t('seaActivities'), isRoute: true },
  ];

  const homePageLinks = [
    { href: '#services', label: t('services'), isRoute: false },
    { href: '#prices', label: t('prices'), isRoute: false },
    { href: '#hours', label: t('hours'), isRoute: false },
    { href: '#location', label: t('location'), isRoute: false },
  ];

  const links = isHomePage ? [...navLinks.slice(0, 1), ...homePageLinks] : navLinks;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to={routePaths[language].home} className="flex items-center">
            <img 
              src="/logo.png" 
              alt="OpenSea Kayak & Paddle Surf Almuñécar" 
              className="h-12 w-12 rounded-full object-cover"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              link.isRoute ? (
                <Link 
                  key={link.href}
                  to={link.href} 
                  className={cn(
                    "font-medium transition-colors",
                    location.pathname === link.href 
                      ? "text-ocean-dark font-semibold" 
                      : "text-gray-700 hover:text-ocean"
                  )}
                >
                  {link.label}
                </Link>
              ) : (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="font-medium text-gray-700 hover:text-ocean transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
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
              {links.map((link) => (
                link.isRoute ? (
                  <Link 
                    key={link.href}
                    to={link.href} 
                    className={cn(
                      "font-medium transition-colors px-3 py-2",
                      location.pathname === link.href 
                        ? "text-ocean-dark font-semibold" 
                        : "text-gray-700 hover:text-ocean"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a 
                    key={link.href}
                    href={link.href} 
                    className="font-medium text-gray-700 hover:text-ocean transition-colors px-3 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
