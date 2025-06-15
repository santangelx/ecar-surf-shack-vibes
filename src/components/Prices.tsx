
import React from 'react';
import { Currency, Waves } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useLanguage } from '@/contexts/LanguageContext';

const Prices = () => {
  const { t } = useLanguage();

  return (
    <section id="prices" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('ourPrices')}</h2>
          <p className="section-subtitle">{t('affordable')}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-ocean-light overflow-x-auto">
            <div className="flex items-center gap-2 mb-4">
              <Currency className="h-6 w-6 text-ocean" />
              <h3 className="text-xl md:text-2xl font-bold text-ocean-dark">{t('kayakTitle')}</h3>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>{t('includeLife')}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('type')}</TableHead>
                    <TableHead>{t('oneHour')}</TableHead>
                    <TableHead>{t('twoHours')}</TableHead>
                    <TableHead>{t('halfDay')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{t('kayakForTwo')}</TableCell>
                    <TableCell>€12</TableCell>
                    <TableCell>€20</TableCell>
                    <TableCell>€35</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-ocean-light overflow-x-auto">
            <div className="flex items-center gap-2 mb-4">
              <Waves className="h-6 w-6 text-ocean" />
              <h3 className="text-xl md:text-2xl font-bold text-ocean-dark">{t('paddleTitle')}</h3>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>{t('allEquipment')}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('type')}</TableHead>
                    <TableHead>{t('oneHour')}</TableHead>
                    <TableHead>{t('twoHours')}</TableHead>
                    <TableHead>{t('halfDay')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{t('paddleBoard')}</TableCell>
                    <TableCell>€10</TableCell>
                    <TableCell>€18</TableCell>
                    <TableCell>€30</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prices;
