
import React from 'react';
import { Ship, Waves as WavesIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  return (
    <section id="services" className="py-20 bg-ocean-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Experience the sea like never before</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border border-ocean-light hover:shadow-lg transition-shadow">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Kayak rental in Almuñecar" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Ship className="h-6 w-6 text-ocean" />
                <CardTitle>Kayak Rentals</CardTitle>
              </div>
              <CardDescription>Explore hidden coves and breathtaking cliffs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our single and double kayaks are perfect for exploring the beautiful coastline of Almuñecar. 
                Stable and easy to maneuver, they're suitable for all experience levels.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border border-ocean-light hover:shadow-lg transition-shadow">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Paddle Surf in Almuñecar" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <WavesIcon className="h-6 w-6 text-ocean" />
                <CardTitle>Paddle Surf</CardTitle>
              </div>
              <CardDescription>Find your balance on the Mediterranean waves</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Stand-up paddle boarding is a fun and relaxing way to enjoy the sea. 
                Our high-quality boards provide excellent stability for beginners and performance for experienced paddlers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
