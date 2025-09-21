import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  MapPin, 
  Users, 
  AlertTriangle, 
  Globe, 
  Smartphone,
  QrCode,
  UserPlus,
  Activity,
  ArrowRight
} from 'lucide-react';
import { TouristRegistration } from '@/components/TouristRegistration';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';

interface RegistrationData {
  fullName: string;
  nationality: string;
  passport: string;
  phone: string;
  emergencyContact: string;
  plannedRoute: string;
  digitalId: string;
  qrCode: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'register'>('home');
  const [isRegistered, setIsRegistered] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleRegistrationComplete = (data: RegistrationData) => {
    setIsRegistered(true);
    setCurrentView('home');
    // In a real app, this would save to a database
    console.log('Registration completed:', data);
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Blockchain Digital ID',
      description: 'Secure, tamper-proof tourist identification system'
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Emergency Panic Button',
      description: 'Instant emergency alerts to authorities and contacts'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Geo-fence Monitoring',
      description: 'Real-time alerts when entering unsafe or restricted areas'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multi-language Support',
      description: 'Interface available in English, Hindi, and Assamese'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'AI Route Monitoring',
      description: 'Intelligent detection of route deviations and inactivity'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Authority Dashboard',
      description: 'Real-time monitoring and E-FIR generation for officials'
    }
  ];

  if (currentView === 'register') {
    return <TouristRegistration onRegistrationComplete={handleRegistrationComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-primary-hover rounded-lg">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t('appName')}</h1>
              <p className="text-xs text-muted-foreground">Safety First Initiative</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="hidden sm:flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Authority Access
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Smartphone className="w-3 h-3 mr-1" />
              Advanced Safety Technology
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              {t('appName')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('welcomeMessage')} - Advanced blockchain-powered safety monitoring 
              for tourists exploring remote and high-risk regions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setCurrentView('register')}
              className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-primary-foreground"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              {t('registerNow')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            {isRegistered && (
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/tourist/demo')}
                className="border-safe text-safe hover:bg-safe/10"
              >
                <Shield className="w-5 h-5 mr-2" />
                Access My Safety Dashboard
              </Button>
            )}
            
            <Button 
              size="lg" 
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Activity className="w-5 h-5 mr-2" />
              View Live Dashboard
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Complete Safety Solution</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combining cutting-edge technology with user-friendly design to ensure tourist safety 
              in challenging environments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Demo Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-safe/5 border-primary/20">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Experience the Demo</h3>
                <p className="text-muted-foreground">
                  Explore our pre-loaded demo with simulated tourist data, real-time alerts, 
                  and authority monitoring capabilities.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      Tourist Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      View the tourist interface with digital ID, panic button, location tracking, 
                      and safety features.
                    </p>
                    <Button 
                      onClick={() => navigate('/tourist/demo')}
                      className="w-full bg-gradient-to-r from-safe to-safe/80 text-safe-foreground"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Tourist Demo
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Authority Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Monitor tourist locations, manage alerts, generate E-FIRs, 
                      and view comprehensive analytics.
                    </p>
                    <Button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full bg-gradient-to-r from-primary to-primary-hover text-primary-foreground"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Authority Demo
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Powered by Advanced Technology</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Blockchain Security', 'AI Route Analysis', 'Real-time GPS', 'Multi-language NLP', 'Emergency Response API'].map((tech) => (
              <Badge key={tech} variant="outline" className="px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;