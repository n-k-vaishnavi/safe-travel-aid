import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  AlertTriangle,
  Shield,
  FileText,
  Clock,
  MapPin,
  Phone,
  Download,
  Eye,
  CheckCircle
} from 'lucide-react';
import { LocationMap } from '@/components/LocationMap';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { demoTourists, demoAlerts, demoGeofences, Alert } from '@/lib/demo-data';

export const AuthorityDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>(demoAlerts);

  const stats = {
    activeTourists: demoTourists.length,
    totalAlerts: alerts.length,
    emergencyAlerts: alerts.filter(a => a.severity === 'critical').length,
    resolvedToday: alerts.filter(a => a.resolved).length,
  };

  const handleGenerateEFir = (alert: Alert) => {
    toast({
      title: 'E-FIR Generated',
      description: `E-FIR created for alert ${alert.id}`,
    });
    
    // Update alert to show E-FIR generated
    setAlerts(prev => prev.map(a => 
      a.id === alert.id ? { ...a, eFireGenerated: true } : a
    ));
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, resolved: true } : a
    ));
    
    toast({
      title: 'Alert Resolved',
      description: 'Alert has been marked as resolved',
    });
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-emergency text-emergency-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-warning/70 text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'panic': return <AlertTriangle className="w-4 h-4 text-emergency" />;
      case 'geofence': return <MapPin className="w-4 h-4 text-warning" />;
      case 'inactive': return <Clock className="w-4 h-4 text-muted-foreground" />;
      case 'route_deviation': return <MapPin className="w-4 h-4 text-warning" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('touristDashboard')}</h1>
            <p className="text-sm text-muted-foreground">Real-time tourist safety monitoring</p>
          </div>
          <LanguageSelector />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold">{stats.activeTourists}</div>
              <div className="text-sm text-muted-foreground">{t('activeTourists')}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-warning" />
              <div className="text-3xl font-bold text-warning">{stats.totalAlerts}</div>
              <div className="text-sm text-muted-foreground">{t('totalAlerts')}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-emergency" />
              <div className="text-3xl font-bold text-emergency">{stats.emergencyAlerts}</div>
              <div className="text-sm text-muted-foreground">{t('emergencyAlerts')}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-safe" />
              <div className="text-3xl font-bold text-safe">{stats.resolvedToday}</div>
              <div className="text-sm text-muted-foreground">{t('resolvedToday')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="map">Live Map</TabsTrigger>
            <TabsTrigger value="alerts">Alert Management</TabsTrigger>
            <TabsTrigger value="tourists">Tourist Directory</TabsTrigger>
          </TabsList>

          {/* Live Map Tab */}
          <TabsContent value="map" className="space-y-6">
            <LocationMap 
              tourists={demoTourists}
              geofences={demoGeofences}
              height="500px"
            />
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <Card key={alert.id} className={`${alert.resolved ? 'opacity-50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              {getTypeIcon(alert.type)}
                              <h4 className="font-semibold">{alert.touristName}</h4>
                              <Badge className={getSeverityColor(alert.severity)}>
                                {alert.severity}
                              </Badge>
                              {alert.resolved && (
                                <Badge variant="outline" className="bg-safe/10 text-safe border-safe">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Resolved
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(alert.timestamp).toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 ml-4">
                            {!alert.resolved && (
                              <>
                                {!alert.eFireGenerated && alert.severity === 'critical' && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleGenerateEFir(alert)}
                                    className="bg-emergency text-emergency-foreground hover:bg-emergency/90"
                                  >
                                    <FileText className="w-3 h-3 mr-1" />
                                    {t('generateEFir')}
                                  </Button>
                                )}
                                
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleResolveAlert(alert.id)}
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  {t('resolveAlert')}
                                </Button>
                              </>
                            )}
                            
                            <Button size="sm" variant="ghost">
                              <Eye className="w-3 h-3 mr-1" />
                              {t('viewDetails')}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tourists Tab */}
          <TabsContent value="tourists" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Registered Tourists
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoTourists.map((tourist) => (
                    <Card key={tourist.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold">{tourist.name}</h4>
                              <Badge 
                                className={
                                  tourist.status === 'safe' ? 'bg-safe text-safe-foreground' :
                                  tourist.status === 'warning' ? 'bg-warning text-warning-foreground' :
                                  'bg-emergency text-emergency-foreground'
                                }
                              >
                                {t(tourist.status)}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                              <span>Nationality: {tourist.nationality}</span>
                              <span>Passport: {tourist.passportNumber}</span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {tourist.phoneNumber}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(tourist.lastSeen).toLocaleTimeString()}
                              </span>
                            </div>
                            
                            <p className="text-sm">
                              <strong>Route:</strong> {tourist.plannedRoute}
                            </p>
                          </div>
                          
                          <div className="flex flex-col gap-2 ml-4">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3 mr-1" />
                              View Profile
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="w-3 h-3 mr-1" />
                              Export Data
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};