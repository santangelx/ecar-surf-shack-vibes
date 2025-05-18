
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Prices from '@/components/Prices';
import BusinessHours from '@/components/BusinessHours';
import Location from '@/components/Location';
import ForBusinesses from '@/components/ForBusinesses';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Prices />
      <BusinessHours />
      <ForBusinesses />
      <Location />
      <Footer />
    </div>
  );
};

export default Index;
