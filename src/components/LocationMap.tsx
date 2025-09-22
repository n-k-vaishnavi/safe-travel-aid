import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Shield, Users } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Tourist, GeofenceZone } from '@/lib/demo-data';

// Temporary simplified map placeholder

interface LocationMapProps {
  tourists: Tourist[];
  geofences: GeofenceZone[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

export const LocationMap: React.FC<LocationMapProps> = ({ 
  tourists, 
  geofences, 
  center = { lat: 26.1445, lng: 91.7362 }, // Guwahati
  zoom = 8,
  height = "400px"
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Map Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{tourists.length}</div>
            <div className="text-xs text-muted-foreground">{t('activeTourists')}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="w-6 h-6 mx-auto mb-2 text-safe" />
            <div className="text-2xl font-bold text-safe">
              {tourists.filter(t => t.status === 'safe').length}
            </div>
            <div className="text-xs text-muted-foreground">{t('safe')}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-warning" />
            <div className="text-2xl font-bold text-warning">
              {tourists.filter(t => t.status === 'warning').length}
            </div>
            <div className="text-xs text-muted-foreground">{t('warning')}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-emergency" />
            <div className="text-2xl font-bold text-emergency">
              {tourists.filter(t => t.status === 'emergency').length}
            </div>
            <div className="text-xs text-muted-foreground">{t('emergency')}</div>
          </CardContent>
        </Card>
      </div>

      {/* Map Container */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {t('currentLocation')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            style={{ height }} 
            className="bg-muted rounded-lg flex items-center justify-center border"
          >
            <div className="text-center space-y-4">
              <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
              <div>
                <p className="font-medium">Live Map View</p>
                <p className="text-sm text-muted-foreground">
                  Showing {tourists.length} tourists and {geofences.length} zones
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
                </p>
              </div>
              
              {/* Tourist Status List */}
              <div className="space-y-2 max-w-sm">
                {tourists.map((tourist) => (
                  <div key={tourist.id} className="flex items-center justify-between p-2 bg-background rounded text-sm">
                    <span className="font-medium">{tourist.name}</span>
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
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};