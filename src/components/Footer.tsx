
import React from 'react';
import { Phone, Mail, Clock, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ocean-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">OpenSea</h3>
            <p className="mb-6">
              Experience the beautiful Mediterranean coast with our kayak and paddle surf rentals in Almuñecar, Granada.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-ocean-light transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#prices" className="hover:text-ocean-light transition-colors">Prices</a>
              </li>
              <li>
                <a href="#hours" className="hover:text-ocean-light transition-colors">Business Hours</a>
              </li>
              <li>
                <a href="#location" className="hover:text-ocean-light transition-colors">Location</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-ocean-light" />
                <span>+34 123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-ocean-light" />
                <a href="mailto:info@opensea-almunecar.com" className="hover:text-ocean-light transition-colors">
                  info@opensea-almunecar.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-ocean-light" />
                <span>Playa San Cristóbal, Almuñecar</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-ocean-light" />
                <div>
                  <p className="font-medium">High Season (Jul-Aug)</p>
                  <p className="text-sm">Daily: 8:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-ocean-light" />
                <div>
                  <p className="font-medium">Low Season (May-Jun, Sep)</p>
                  <p className="text-sm">Daily: 9:00 AM - 7:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} OpenSea Kayak & Paddle Surf. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
