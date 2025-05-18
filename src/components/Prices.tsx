
import React from 'react';
import { Currency, WaterIcon } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const Prices = () => {
  return (
    <section id="prices" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Prices</h2>
          <p className="section-subtitle">Affordable adventures for everyone</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-ocean-light">
            <div className="flex items-center gap-2 mb-4">
              <Currency className="h-6 w-6 text-ocean" />
              <h3 className="text-2xl font-bold text-ocean-dark">Kayak Rental</h3>
            </div>
            
            <Table>
              <TableCaption>Prices include life jacket and basic instruction.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>1 Hour</TableHead>
                  <TableHead>2 Hours</TableHead>
                  <TableHead>Half Day</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Single Kayak</TableCell>
                  <TableCell>€12</TableCell>
                  <TableCell>€20</TableCell>
                  <TableCell>€35</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Double Kayak</TableCell>
                  <TableCell>€18</TableCell>
                  <TableCell>€30</TableCell>
                  <TableCell>€50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Family Kayak (3 pers)</TableCell>
                  <TableCell>€22</TableCell>
                  <TableCell>€38</TableCell>
                  <TableCell>€60</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-ocean-light">
            <div className="flex items-center gap-2 mb-4">
              <WaterIcon className="h-6 w-6 text-ocean" />
              <h3 className="text-2xl font-bold text-ocean-dark">Paddle Surf</h3>
            </div>
            
            <Table>
              <TableCaption>All equipment included. Lessons available upon request.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>1 Hour</TableHead>
                  <TableHead>2 Hours</TableHead>
                  <TableHead>Half Day</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Standard Board</TableCell>
                  <TableCell>€15</TableCell>
                  <TableCell>€25</TableCell>
                  <TableCell>€40</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Premium Board</TableCell>
                  <TableCell>€18</TableCell>
                  <TableCell>€32</TableCell>
                  <TableCell>€50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Beginner Lesson</TableCell>
                  <TableCell>€25</TableCell>
                  <TableCell>€45</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prices;
