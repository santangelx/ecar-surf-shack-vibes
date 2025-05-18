
import React from 'react';
import { MapPin, ArrowDown } from "lucide-react";

const Location = () => {
  return (
    <section id="location" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">Find Us</h2>
          <p className="section-subtitle">We're located on the beautiful beach of Almuñecar</p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-6 w-6 text-ocean mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-ocean-dark">OpenSea Almuñecar</h3>
                  <p className="text-gray-700">
                    Playa San Cristóbal<br />
                    18690 Almuñecar<br />
                    Granada, Spain
                  </p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <p className="text-gray-700">
                  <strong>How to find us:</strong> We're located on San Cristóbal beach, 
                  right next to the blue flag area. Look for our blue and white flags with the OpenSea logo.
                </p>
                
                <p className="text-gray-700">
                  <strong>Parking:</strong> Free parking is available nearby at the public parking lot, 
                  just a 3-minute walk from our location.
                </p>
                
                <div className="mt-6">
                  <a 
                    href="https://maps.google.com/?q=Playa+San+Cristóbal+Almuñecar+Granada" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Get Directions
                    <ArrowDown className="h-4 w-4 rotate-[135deg]" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 h-72 md:h-auto">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.0297433707007!2d-3.7004735000000004!3d36.7370022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd70e5a2556a9b93%3A0xefc40cad5b8908e5!2sPlaya%20de%20San%20Crist%C3%B3bal!5e0!3m2!1sen!2ses!4v1716400674084!5m2!1sen!2ses"
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
