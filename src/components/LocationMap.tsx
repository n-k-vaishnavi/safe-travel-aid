import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Shield, Users } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Tourist, GeofenceZone } from '@/lib/demo-data';

// Fix for default marker icons in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

  // Create custom icons for different tourist statuses
  const createCustomIcon = (status: 'safe' | 'warning' | 'emergency') => {
    const colors = {
      safe: '#22c55e',
      warning: '#f59e0b',
      emergency: '#ef4444'
    };
    
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="10" fill="${colors[status]}" stroke="white" stroke-width="2"/>
          <circle cx="12" cy="12" r="4" fill="white"/>
        </svg>
      `)}`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
  };

  // Get polygon colors based on zone type
  const getZoneColor = (type: GeofenceZone['type']) => {
    switch (type) {
      case 'restricted':
        return '#ef4444'; // Red
      case 'unsafe':
        return '#f59e0b'; // Orange
      case 'safe':
        return '#22c55e'; // Green
      case 'border':
        return '#8b5cf6'; // Purple
      default:
        return '#6b7280'; // Gray
    }
  };

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
        <CardContent className="p-0">
          <div style={{ height }}>
            <MapContainer
              center={[center.lat, center.lng]}
              zoom={zoom}
              style={{ height: '100%', width: '100%' }}
              className="rounded-b-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* Geofence zones */}
              {geofences.map((zone) => (
                <Polygon
                  key={zone.id}
                  positions={zone.coordinates.map(coord => [coord.lat, coord.lng])}
                  pathOptions={{
                    color: getZoneColor(zone.type),
                    fillColor: getZoneColor(zone.type),
                    fillOpacity: 0.2,
                    weight: 2
                  }}
                >
                  <Popup>
                    <div className="space-y-2">
                      <h4 className="font-bold">{zone.name}</h4>
                      <Badge variant={zone.type === 'restricted' ? 'destructive' : 'secondary'}>
                        {zone.type}
                      </Badge>
                      <p className="text-sm">{zone.description}</p>
                    </div>
                  </Popup>
                </Polygon>
              ))}
              
              {/* Tourist markers */}
              {tourists.map((tourist) => (
                <Marker
                  key={tourist.id}
                  position={[tourist.location.lat, tourist.location.lng]}
                  icon={createCustomIcon(tourist.status)}
                >
                  <Popup>
                    <div className="space-y-2 min-w-[200px]">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold">{tourist.name}</h4>
                        <Badge 
                          variant={
                            tourist.status === 'safe' ? 'secondary' :
                            tourist.status === 'warning' ? 'outline' : 'destructive'
                          }
                          className={
                            tourist.status === 'safe' ? 'bg-safe text-safe-foreground' :
                            tourist.status === 'warning' ? 'bg-warning text-warning-foreground' : ''
                          }
                        >
                          {t(tourist.status)}
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><strong>Nationality:</strong> {tourist.nationality}</p>
                        <p><strong>{t('phone')}:</strong> {tourist.phoneNumber}</p>
                        <p><strong>{t('lastSeen')}:</strong> {new Date(tourist.lastSeen).toLocaleTimeString()}</p>
                        <p><strong>{t('plannedRoute')}:</strong> {tourist.plannedRoute}</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};