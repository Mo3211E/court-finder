import React from 'react';
import { Slider } from '@/components/ui/slider';
import { MapPin } from 'lucide-react';

interface RadiusSelectorProps {
  radius: number;
  onRadiusChange: (radius: number) => void;
}

export const RadiusSelector: React.FC<RadiusSelectorProps> = ({ radius, onRadiusChange }) => {
  return (
    <div className="fixed top-20 left-4 z-50 bg-card/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-basketball-primary/30 w-64">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-basketball-primary" />
        <span className="text-sm font-medium text-foreground">Search Radius</span>
      </div>
      <div className="space-y-2">
        <Slider
          value={[radius]}
          onValueChange={(value) => onRadiusChange(value[0])}
          min={10}
          max={100}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>10 mi</span>
          <span className="text-basketball-primary font-semibold">{radius} miles</span>
          <span>100 mi</span>
        </div>
      </div>
    </div>
  );
};
