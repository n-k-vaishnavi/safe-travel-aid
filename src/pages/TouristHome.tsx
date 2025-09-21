import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Clock, 
  Route, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Navigation,
  Phone
} from 'lucide-react';
import { PanicButton } from '@/components/PanicButton';
import { LanguageSelector } from '@/components/LanguageSelector';
import { DigitalId } from '@/components/DigitalId';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';

interface TouristData {
  fullName: string;
  nationality: string;
  passport: string;
  digitalId: string;
  qrCode: string;
  currentLocation: string;
  lastCheckIn: string;
  plannedRoute: string;
  status: 'safe' | 'warning' | 'emergency';
}

interface TouristHomeProps {
  touristData: TouristData;
}

export const TouristHome: React.FC<TouristHomeProps> = ({ touristData }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationStatus, setLocationStatus] = useState<'tracking' | 'paused'>('tracking');

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handlePanic = () => {
    // Simulate emergency response
    console.log('Emergency alert triggered for:', touristData.fullName);
    
    // Could integrate with actual emergency services API
    toast({
      title: t('panicActivated'),
      description: 'Emergency services have been notified. Stay calm, help is on the way.',
      variant: 'destructive',
    });
  };

  const handleCheckIn = () => {
    toast({
      title: t('checkIn') + ' Successful',
      description: 'Your location has been updated.',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-safe text-safe-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'emergency': return 'bg-emergency text-emergency-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'emergency': return <AlertTriangle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('appName')}</h1>
            <p className="text-sm text-muted-foreground">{t('stayConnected')}</p>
          </div>
          <LanguageSelector />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-safe/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Welcome, {touristData.fullName}
                </h2>
                <p className="text-muted-foreground">{t('welcomeMessage')}</p>
              </div>
              <Badge className={getStatusColor(touristData.status)}>
                {getStatusIcon(touristData.status)}
                {t(touristData.status)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Section */}
        <Card className="border-emergency/20 bg-gradient-to-r from-emergency/5 to-warning/5">
          <CardHeader>
            <CardTitle className="text-center text-emergency">Emergency Response</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Press and hold the button below if you need immediate help
            </p>
            <PanicButton onPanic={handlePanic} />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="w-3 h-3" />
              <span>Emergency Contact: {touristData.passport} • Instant Alert</span>
            </div>
          </CardContent>
        </Card>

        {/* Status Dashboard */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Location Tracking</span>
                  <Badge variant={locationStatus === 'tracking' ? 'default' : 'secondary'}>
                    {locationStatus === 'tracking' ? 'Active' : 'Paused'}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm">Guwahati, Assam</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{t('lastSeen')}: {currentTime.toLocaleTimeString()}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Route className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{touristData.plannedRoute}</span>
                </div>
              </div>

              <Separator />

              <Button 
                onClick={handleCheckIn}
                className="w-full bg-gradient-to-r from-safe to-safe/80 hover:from-safe/90 hover:to-safe/70 text-safe-foreground"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {t('checkIn')} Now
              </Button>
            </CardContent>
          </Card>

          {/* Digital ID */}
          <div className="space-y-4">
            <DigitalId touristData={touristData} />
          </div>
        </div>

        {/* Safety Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Safety Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-safe">✓ Safe Practices</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Keep your phone charged</li>
                  <li>• Share your location with trusted contacts</li>
                  <li>• Check in regularly</li>
                  <li>• Follow planned routes</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-warning">⚠ Important Reminders</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Avoid restricted border areas</li>
                  <li>• Stay in groups when possible</li>
                  <li>• Inform guides of any changes</li>
                  <li>• Carry emergency contacts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};