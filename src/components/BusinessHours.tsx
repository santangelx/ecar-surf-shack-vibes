
import React from 'react';
import { Clock, Sun, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const BusinessHours = () => {
  return (
    <section id="hours" className="py-20 bg-sand-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">Business Hours</h2>
          <p className="section-subtitle">When you can visit us</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-ocean-light">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-ocean" />
                <CardTitle>Opening Times</CardTitle>
              </div>
              <CardDescription>May to September 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-ocean-light/50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Sun className="h-5 w-5 text-ocean" />
                    High Season (July - August)
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">9:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday - Sunday:</span>
                      <span className="font-medium">8:00 AM - 9:00 PM</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-ocean-light/50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Sun className="h-5 w-5 text-ocean" />
                    Low Season (May, June, Sept)
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">10:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday - Sunday:</span>
                      <span className="font-medium">9:00 AM - 7:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Alert className="bg-coral-light/50 border-coral">
                <Info className="h-4 w-4 text-coral" />
                <AlertTitle>Please Note</AlertTitle>
                <AlertDescription>
                  Hours may vary depending on weather conditions. For rentals longer than 2 hours, 
                  please book in advance. Last rental is 2 hours before closing time.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BusinessHours;
