import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';

interface PanicButtonProps {
  onPanic: () => void;
}

export const PanicButton: React.FC<PanicButtonProps> = ({ onPanic }) => {
  const [isPanicking, setIsPanicking] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handlePanicPress = () => {
    setIsPanicking(true);
    onPanic();
    
    // Show toast
    toast({
      title: t('panicActivated'),
      description: 'Emergency services have been notified',
      variant: 'destructive',
    });

    // Reset after animation
    setTimeout(() => setIsPanicking(false), 2000);
  };

  return (
    <div className="relative">
      {/* Pulse animation ring */}
      <div 
        className={`absolute inset-0 rounded-full bg-emergency/30 animate-ping ${
          isPanicking ? 'scale-150' : 'scale-100'
        } transition-transform duration-1000`}
      />
      
      {/* Main panic button */}
      <Button
        onClick={handlePanicPress}
        disabled={isPanicking}
        className={`
          relative z-10 w-32 h-32 rounded-full 
          bg-gradient-to-br from-emergency to-emergency/80 
          hover:from-emergency/90 hover:to-emergency/70
          text-emergency-foreground font-bold text-lg
          shadow-lg hover:shadow-xl
          transition-all duration-200
          border-4 border-white
          ${isPanicking ? 'scale-95' : 'scale-100'}
        `}
      >
        <div className="flex flex-col items-center gap-2">
          {isPanicking ? (
            <Phone className="w-8 h-8 animate-bounce" />
          ) : (
            <AlertTriangle className="w-8 h-8" />
          )}
          <span className="text-sm font-black tracking-wide">
            {t('panicButton')}
          </span>
        </div>
      </Button>
    </div>
  );
};