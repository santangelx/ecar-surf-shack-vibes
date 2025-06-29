
import React from 'react';
import { MapPin, ArrowDown } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const Location = () => {
  const { t } = useLanguage();

  return (
    <section id="location" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('findUs')}</h2>
          <p className="section-subtitle">{t('locationSubtitle')}</p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-6 w-6 text-ocean mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-ocean-dark">Open Sea</h3>
                  <p className="text-gray-700">
                    Pl. San Cristóbal<br />
                    18690 Almuñécar<br />
                    Granada, Spain
                  </p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <p className="text-gray-700">
                  <strong>{t('howToFindUs')}:</strong> {t('locationDescription')}
                </p>
                
                <div className="mt-6">
                  <a 
                    href="https://maps.google.com/?q=36.7294014,-3.695261" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    {t('getDirections')}
                    <ArrowDown className="h-4 w-4 rotate-[135deg]" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 h-72 md:h-auto">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.3!2d-3.695261!3d36.7294014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7189a876287c0f:0x38a35eb411bcec10!2sOpen+Sea!5e0!3m2!1sen!2ses!4v1716400674084!5m2!1sen!2ses"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
