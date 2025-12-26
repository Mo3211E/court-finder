import React from 'react';

export const MapLegend: React.FC = () => {
  return (
    <div className="fixed top-44 left-4 z-50 bg-card/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-basketball-primary/30">
      <h4 className="text-sm font-medium text-foreground mb-3">Legend</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-basketball-primary shadow-lg shadow-orange-500/50" />
          </div>
          <span className="text-xs text-muted-foreground">Basketball Court</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 animate-pulse opacity-60" />
            <div className="w-3 h-3 rounded-full bg-basketball-primary relative z-10" />
          </div>
          <span className="text-xs text-muted-foreground">Active Games 🔥</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <span className="text-xs text-muted-foreground">Other Venues</span>
        </div>
      </div>
    </div>
  );
};
