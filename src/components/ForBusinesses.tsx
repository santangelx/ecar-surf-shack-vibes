
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building, Hotel, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BusinessContactDialog from './BusinessContactDialog';

const ForBusinesses = () => {
  const { t } = useLanguage();
  
  return (
    <section id="businesses" className="py-20 bg-gradient-to-b from-ocean-light to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('forBusinesses')}</h2>
          <p className="section-subtitle">{t('hotelDeals')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <Hotel className="h-12 w-12 text-ocean mb-4" />
            <h3 className="text-xl font-bold mb-2 text-ocean-dark">Hotels</h3>
            <p className="text-gray-700">
              Offer your guests exclusive discounts on our water activities. 
              We can provide personalized vouchers with your hotel branding.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <Building className="h-12 w-12 text-ocean mb-4" />
            <h3 className="text-xl font-bold mb-2 text-ocean-dark">Apartments</h3>
            <p className="text-gray-700">
              Include our services in your welcome package. 
              We can provide promotional materials and special rates for your guests.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <Users className="h-12 w-12 text-ocean mb-4" />
            <h3 className="text-xl font-bold mb-2 text-ocean-dark">Tour Operators</h3>
            <p className="text-gray-700">
              Add our activities to your excursion offers.
              We provide group discounts and can accommodate large bookings.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            {t('businessDesc')}
          </p>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-8">
            <h4 className="text-xl font-bold mb-4 text-ocean-dark">{t('referralProgram')}</h4>
            <p className="text-gray-700 mb-6">
              {t('referralDescription')}
            </p>
            <BusinessContactDialog>
              <Button className="btn-primary">{t('contactUs')}</Button>
            </BusinessContactDialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForBusinesses;
