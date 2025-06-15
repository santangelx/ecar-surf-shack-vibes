
import React from 'react';
import { Clock, Sun, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from '@/contexts/LanguageContext';

const BusinessHours = () => {
  const { t } = useLanguage();

  return (
    <section id="hours" className="py-20 bg-sand-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('businessHours')}</h2>
          <p className="section-subtitle">{t('whenVisit')}</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-ocean-light">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-ocean" />
                <CardTitle>{t('openingTimes')}</CardTitle>
              </div>
              <CardDescription>{t('seasonInfo')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-ocean-light/50 p-4 rounded-md">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Sun className="h-5 w-5 text-ocean" />
                  {t('dailyHours')}
                </h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>{t('everyday')}:</span>
                    <span className="font-medium">10:00 AM - 8:00 PM</span>
                  </li>
                </ul>
              </div>
              
              <Alert className="bg-coral-light/50 border-coral">
                <Info className="h-4 w-4 text-coral" />
                <AlertTitle>{t('pleaseNote')}</AlertTitle>
                <AlertDescription>
                  {t('weatherNote')}
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
