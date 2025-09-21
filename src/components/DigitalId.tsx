import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, QrCode } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface DigitalIdProps {
  touristData: {
    fullName: string;
    nationality: string;
    passport: string;
    digitalId: string;
    qrCode: string;
  };
}

export const DigitalId: React.FC<DigitalIdProps> = ({ touristData }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-safe/5 border-2 border-primary/20 shadow-xl">
        <CardContent className="p-0">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-primary to-primary-hover p-6 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t('digitalId')}</h3>
                  <p className="text-xs opacity-90">{t('appName')}</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-safe text-safe-foreground">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>

          {/* Tourist Information */}
          <div className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">{touristData.fullName}</h2>
              <p className="text-sm text-muted-foreground">
                {touristData.nationality} • {touristData.passport}
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center p-4 bg-white rounded-lg border-2 border-dashed border-muted">
              {touristData.qrCode ? (
                <img 
                  src={touristData.qrCode} 
                  alt="Digital ID QR Code"
                  className="w-32 h-32"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-muted rounded">
                  <QrCode className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Blockchain ID */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Blockchain ID
              </p>
              <p className="text-xs font-mono bg-muted/50 p-2 rounded border break-all">
                {touristData.digitalId}
              </p>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 p-3 bg-safe-light rounded-lg">
              <Shield className="w-4 h-4 text-safe" />
              <span className="text-sm font-medium text-safe-foreground">
                Blockchain Secured
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};