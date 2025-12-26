import React from 'react';
import { BasketballCourt } from '@/types/court';
import { Clock, MapPin, Flame } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface GamesHotbarProps {
  courts: BasketballCourt[];
  onCourtClick: (court: BasketballCourt) => void;
}

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

const formatDays = (days: string[]): string => {
  if (days.length === 5 && !days.includes('Saturday') && !days.includes('Sunday')) {
    return 'Weekdays';
  }
  if (days.length === 2 && days.includes('Saturday') && days.includes('Sunday')) {
    return 'Weekends';
  }
  if (days.length === 7) {
    return 'Daily';
  }
  if (days.length === 1) {
    return days[0] + 's';
  }
  return days.join(', ');
};

export const GamesHotbar: React.FC<GamesHotbarProps> = ({ courts, onCourtClick }) => {
  if (courts.length === 0) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-basketball-primary/30 p-4">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">No games reported in this area</p>
          <p className="text-xs mt-1">Be the first to report a game!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-basketball-primary/30">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-3 px-2">
          <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
          <h3 className="font-heading font-semibold text-foreground">
            Active Games ({courts.length})
          </h3>
        </div>
        
        <ScrollArea className="w-full">
          <div className="flex gap-3 pb-2 px-2">
            {courts.map((court) => (
              <button
                key={court.id}
                onClick={() => onCourtClick(court)}
                className="flex-shrink-0 w-72 bg-gradient-to-br from-orange-500/10 to-red-500/10 
                         border border-basketball-primary/40 rounded-xl p-4 
                         hover:border-basketball-primary hover:shadow-lg hover:shadow-orange-500/20
                         transition-all duration-200 text-left group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🔥</span>
                      <h4 className="font-heading font-semibold text-foreground group-hover:text-basketball-primary transition-colors truncate">
                        {court.name}
                      </h4>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{court.city}, {court.state}</span>
                    </div>
                  </div>
                </div>
                
                {court.games.map((game, index) => (
                  <div key={game.id} className={`${index > 0 ? 'mt-2 pt-2 border-t border-border/50' : ''}`}>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-basketball-primary" />
                      <span className="text-foreground font-medium">
                        {formatDays(game.dayOfWeek)}
                      </span>
                    </div>
                    <div className="text-sm text-basketball-primary font-semibold mt-1">
                      {formatTime(game.startTime)} - {formatTime(game.endTime)}
                    </div>
                    {game.description && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {game.description}
                      </div>
                    )}
                  </div>
                ))}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
