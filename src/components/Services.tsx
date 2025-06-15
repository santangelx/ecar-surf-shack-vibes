
import React from 'react';
import { Ship, Waves as WavesIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-ocean-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('ourServices')}</h2>
          <p className="section-subtitle">{t('experienceDescription')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border border-ocean-light hover:shadow-lg transition-shadow">
            <div className="h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/869ecf53-d212-4608-9c1d-4e6b39eec930.png"
                alt="Kayak rental in Almuñecar" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Ship className="h-6 w-6 text-ocean" />
                <CardTitle>{t('kayakTitle')}</CardTitle>
              </div>
              <CardDescription>{t('kayakDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('kayakDetails')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border border-ocean-light hover:shadow-lg transition-shadow">
            <div className="h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/4abaaebd-31d0-4686-b20c-2fb57e98930d.png"
                alt="Paddle Surf in Almuñecar" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <WavesIcon className="h-6 w-6 text-ocean" />
                <CardTitle>{t('paddleTitle')}</CardTitle>
              </div>
              <CardDescription>{t('paddleDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {t('paddleDetails')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
