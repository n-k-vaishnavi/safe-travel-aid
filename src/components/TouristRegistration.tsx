import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, User, Globe, Phone, Route, CreditCard } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

interface RegistrationData {
  fullName: string;
  nationality: string;
  passport: string;
  phone: string;
  emergencyContact: string;
  plannedRoute: string;
}

interface TouristRegistrationProps {
  onRegistrationComplete: (data: RegistrationData & { digitalId: string; qrCode: string }) => void;
}

export const TouristRegistration: React.FC<TouristRegistrationProps> = ({ 
  onRegistrationComplete 
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    nationality: '',
    passport: '',
    phone: '',
    emergencyContact: '',
    plannedRoute: ''
  });

  const generateBlockchainId = async (data: RegistrationData): Promise<string> => {
    // Simulate blockchain registration
    const timestamp = Date.now();
    const hash = btoa(`${data.passport}-${timestamp}-${data.fullName}`);
    return `0x${hash.slice(0, 32)}`;
  };

  const generateQRCode = async (digitalId: string): Promise<string> => {
    try {
      const qrData = JSON.stringify({
        digitalId,
        timestamp: Date.now(),
        type: 'tourist-safety-id'
      });
      return await QRCode.toDataURL(qrData);
    } catch (error) {
      console.error('QR Code generation failed:', error);
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate blockchain ID
      const digitalId = await generateBlockchainId(formData);
      
      // Generate QR code
      const qrCode = await generateQRCode(digitalId);

      onRegistrationComplete({
        ...formData,
        digitalId,
        qrCode
      });

      toast({
        title: t('registrationSuccess'),
        description: 'Your digital ID has been created',
      });
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-primary to-primary-hover rounded-full">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">{t('registration')}</h1>
        <p className="text-muted-foreground">{t('welcomeMessage')}</p>
      </div>

      {/* Registration Form */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {t('personalInfo')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('fullName')}</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nationality">{t('nationality')}</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder="USA"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passport" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                {t('passport')}
              </Label>
              <Input
                id="passport"
                value={formData.passport}
                onChange={(e) => handleInputChange('passport', e.target.value)}
                placeholder="AB1234567"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t('phone')}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1-555-0123"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">{t('emergencyContact')}</Label>
                <Input
                  id="emergencyContact"
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="+1-555-0124"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="plannedRoute" className="flex items-center gap-2">
                <Route className="w-4 h-4" />
                {t('plannedRoute')}
              </Label>
              <Input
                id="plannedRoute"
                value={formData.plannedRoute}
                onChange={(e) => handleInputChange('plannedRoute', e.target.value)}
                placeholder="Guwahati → Kaziranga → Shillong"
                required
              />
            </div>

            <Separator />

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? t('loading') : t('registerNow')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};