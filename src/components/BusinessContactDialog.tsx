
import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const BusinessContactDialog = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would normally send the form data to a server
    toast({
      title: "Message sent!",
      description: "We'll get back to you shortly.",
    });
    
    setOpen(false);
    
    // Reset the form
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('contactUs')}</DialogTitle>
            <DialogDescription>
              {t('businessReferral')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t('name')}</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="company">{t('company')}</Label>
                <Input 
                  id="company" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message">{t('message')}</Label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder={t('businessInquiryPlaceholder')} 
                className="min-h-[120px]"
                required 
              />
            </div>
            
            <div className="bg-ocean-light/30 p-3 rounded-md mt-2">
              <p className="text-sm text-ocean-dark">
                {t('referralCommission')}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t('cancel')}
            </Button>
            <Button type="submit">
              {t('send')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessContactDialog;
