
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center bg-hero-pattern bg-cover bg-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent"></div>
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-ocean-dark animate-fade-in">
            <span className="block">OPEN</span>
            <span className="text-coral">SEA</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 animate-fade-in">
            Kayak & Paddle Surf in Almuñecar, Granada
          </h2>
          <p className="text-lg text-gray-700 mb-8 animate-fade-in">
            Experience the beautiful Mediterranean coast from a different perspective. 
            Rent kayaks and paddle surf boards with us for an unforgettable adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button className="btn-primary">Reserve Here</Button>
            <Button className="btn-secondary">View Prices</Button>
          </div>
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
