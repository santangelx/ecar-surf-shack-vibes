
import React from 'react';
import { Clock, Calendar } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const BusinessHours = () => {
  const { t } = useLanguage();

  return (
    <section id="hours" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('businessHours')}</h2>
          <p className="section-subtitle">{t('whenVisit')}</p>
        </div>

        <div className="max-w-4xl mx-auto">



          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-8 w-8 text-ocean" />
              <h3 className="text-2xl font-bold text-ocean-dark">{t('dailyHours')}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium text-gray-700">{t('everyday')}</span>
                <span className="text-ocean font-semibold">10:00 AM - 8:00 PM</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800 mb-2">{t('pleaseNote')}</p>
              <p className="text-sm text-yellow-700">{t('weatherNote')}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BusinessHours;
