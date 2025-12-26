import React from 'react';
import { X, MapPin, Star, Users, Clock, Calendar, ExternalLink } from 'lucide-react';
import { BasketballCourt, SkillLevel } from '@/types/court';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CourtDetailModalProps {
  court: BasketballCourt;
  onClose: () => void;
}

const skillLevelLabels: Record<SkillLevel, string> = {
  'amateur': 'Amateur',
  'mediocre': 'Mediocre',
  'skilled': 'Skilled',
  'high-level': 'High Level',
  'pro': 'Pro'
};

const skillLevelColors: Record<SkillLevel, string> = {
  'amateur': '#22c55e',
  'mediocre': '#84cc16',
  'skilled': '#eab308',
  'high-level': '#f97316',
  'pro': '#ef4444'
};

const qualityColors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

export const CourtDetailModal: React.FC<CourtDetailModalProps> = ({ court, onClose }) => {
  const hasGames = court.games.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl border border-basketball-primary/30">
        {/* Header with image */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img
            src={court.photos[0]}
            alt={court.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
          {hasGames && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse">
                🔥 Active Games
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title and location */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              {court.name}
            </h2>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2 text-basketball-primary" />
              <span>{court.address}, {court.city}, {court.state}</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-background rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-basketball-primary">{court.numberOfCourts}</div>
              <div className="text-xs text-muted-foreground">Courts</div>
            </div>
            <div className="bg-background rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-basketball-primary">{court.reportedBy}</div>
              <div className="text-xs text-muted-foreground">Reports</div>
            </div>
            <div className="bg-background rounded-xl p-4 text-center">
              <div className="text-2xl">{court.type === 'indoor' ? '🏢' : '☀️'}</div>
              <div className="text-xs text-muted-foreground capitalize">{court.type}</div>
            </div>
          </div>

          {/* Quality Rating */}
          <div className="space-y-3">
            <h3 className="text-lg font-heading font-semibold text-foreground flex items-center">
              <Star className="w-5 h-5 mr-2 text-basketball-primary" />
              Court Quality
            </h3>
            <div className="bg-background rounded-xl p-4 space-y-3">
              {/* Quality bar visualization */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Overall</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className="w-8 h-6 rounded-sm flex items-center justify-center text-xs font-bold transition-all"
                      style={{
                        backgroundColor: level <= court.quality.overall ? qualityColors[level - 1] : '#374151',
                        color: level <= court.quality.overall ? '#000' : '#6b7280'
                      }}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Surface</span>
                  <span style={{ color: qualityColors[court.quality.surface - 1] }}>
                    {'★'.repeat(court.quality.surface)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hoops</span>
                  <span style={{ color: qualityColors[court.quality.hoops - 1] }}>
                    {'★'.repeat(court.quality.hoops)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lighting</span>
                  <span style={{ color: qualityColors[court.quality.lighting - 1] }}>
                    {'★'.repeat(court.quality.lighting)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Maintenance</span>
                  <span style={{ color: qualityColors[court.quality.maintenance - 1] }}>
                    {'★'.repeat(court.quality.maintenance)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Skill Level */}
          <div className="space-y-3">
            <h3 className="text-lg font-heading font-semibold text-foreground flex items-center">
              <Users className="w-5 h-5 mr-2 text-basketball-primary" />
              Average Skill Level
            </h3>
            <div className="bg-background rounded-xl p-4">
              <div className="flex items-center justify-between">
                {(['amateur', 'mediocre', 'skilled', 'high-level', 'pro'] as SkillLevel[]).map((level, index) => (
                  <div
                    key={level}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all ${
                        level === court.averageSkillLevel
                          ? 'ring-2 ring-offset-2 ring-offset-card scale-110'
                          : 'opacity-40'
                      }`}
                      style={{
                        backgroundColor: skillLevelColors[level],
                        color: '#000',
                        boxShadow: level === court.averageSkillLevel ? `0 0 20px ${skillLevelColors[level]}` : 'none'
                      }}
                    >
                      {index + 1}
                    </div>
                    <span className={`text-[10px] ${level === court.averageSkillLevel ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                      {skillLevelLabels[level]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Games Schedule */}
          {hasGames && (
            <div className="space-y-3">
              <h3 className="text-lg font-heading font-semibold text-foreground flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-basketball-primary" />
                Scheduled Games
              </h3>
              <div className="space-y-2">
                {court.games.map((game) => (
                  <div
                    key={game.id}
                    className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-basketball-primary/30 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{game.description || 'Pickup Game'}</span>
                      <Badge variant="outline" className="border-basketball-primary text-basketball-primary">
                        {game.recurring}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {game.dayOfWeek.join(', ')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatTime(game.startTime)} - {formatTime(game.endTime)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo gallery */}
          {court.photos.length > 1 && (
            <div className="space-y-3">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Photos
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {court.photos.slice(1).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${court.name} photo ${index + 2}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer info */}
          <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
            <span>Last updated: {court.lastUpdated}</span>
            <div className="flex gap-2">
              {court.isFree ? (
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">Free</Badge>
              ) : (
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">Paid</Badge>
              )}
              {court.membershipRequired && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">Membership</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
