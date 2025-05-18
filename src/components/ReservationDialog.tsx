
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ReservationDialog = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState<string>('kayak');
  const [duration, setDuration] = useState<string>('1');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [price, setPrice] = useState<number>(12);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Price calculation based on activity and duration
  useEffect(() => {
    let basePrice = 0;
    
    if (activity === 'kayak') {
      // Single kayak prices
      if (duration === '1') basePrice = 12;
      else if (duration === '2') basePrice = 20;
      else if (duration === 'half') basePrice = 35;
    } else {
      // Standard paddle surf prices
      if (duration === '1') basePrice = 15;
      else if (duration === '2') basePrice = 25;
      else if (duration === 'half') basePrice = 40;
    }
    
    setPrice(basePrice);
  }, [activity, duration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would normally send the reservation data to a server
    toast({
      title: "Reservation submitted!",
      description: `We'll contact you soon to confirm your ${activity} reservation.`,
    });
    
    setOpen(false);
    
    // Reset the form
    setActivity('kayak');
    setDuration('1');
    setDate(undefined);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('makeReservation')}</DialogTitle>
            <DialogDescription>
              {t('selectActivity')}, {t('selectDuration')}, {t('selectDate')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="activity">{t('selectActivity')}</Label>
              <RadioGroup 
                id="activity" 
                value={activity} 
                onValueChange={setActivity}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kayak" id="kayak" />
                  <Label htmlFor="kayak">{t('kayak')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paddle" id="paddle" />
                  <Label htmlFor="paddle">{t('paddleSurf')}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="duration">{t('selectDuration')}</Label>
              <Select 
                value={duration} 
                onValueChange={setDuration}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder={t('selectDuration')} />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-white">
                  <SelectItem value="1">{t('oneHour')}</SelectItem>
                  <SelectItem value="2">{t('twoHours')}</SelectItem>
                  <SelectItem value="half">{t('halfDay')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date">{t('selectDate')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : t('selectDate')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="border-t border-ocean-light pt-2 mt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="price" className="text-lg font-medium">
                  {t('price')}:
                </Label>
                <span id="price" className="text-xl font-bold text-ocean-dark">
                  €{price}
                </span>
              </div>
            </div>
            
            <div className="border-t border-ocean-light pt-2 mt-2">
              <h4 className="font-medium mb-2">{t('yourDetails')}</h4>
              
              <div className="grid gap-2">
                <Label htmlFor="name">{t('name')}</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="grid gap-2 mt-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="grid gap-2 mt-2">
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t('cancel')}
            </Button>
            <Button type="submit">
              {t('reserve')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialog;
