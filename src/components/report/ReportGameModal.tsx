import React, { useState, useMemo } from 'react';
import { X, Search, MapPin, Plus, Calendar, Clock, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BasketballCourt, GameSchedule, SkillLevel } from '@/types/court';
import { mockCourts } from '@/data/mockCourts';
import { CreateCourtForm } from './CreateCourtForm';
import { toast } from 'sonner';

interface ReportGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SKILL_LEVELS: { value: SkillLevel; label: string }[] = [
  { value: 'amateur', label: 'Amateur' },
  { value: 'mediocre', label: 'Mediocre' },
  { value: 'skilled', label: 'Skilled' },
  { value: 'high-level', label: 'High Level' },
  { value: 'pro', label: 'Pro' },
];

type Step = 'search' | 'create-court' | 'game-details';

export const ReportGameModal = ({ isOpen, onClose }: ReportGameModalProps) => {
  const [step, setStep] = useState<Step>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourt, setSelectedCourt] = useState<BasketballCourt | null>(null);
  const [newCourt, setNewCourt] = useState<BasketballCourt | null>(null);
  
  // Game details state
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [recurring, setRecurring] = useState<'daily' | 'weekly' | 'monthly' | 'once'>('weekly');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('skilled');
  const [description, setDescription] = useState('');

  // Filter courts based on search query
  const filteredCourts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return mockCourts.filter(court => 
      court.name.toLowerCase().includes(query) ||
      court.address.toLowerCase().includes(query) ||
      court.city.toLowerCase().includes(query) ||
      (court.gymName && court.gymName.toLowerCase().includes(query))
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSelectCourt = (court: BasketballCourt) => {
    setSelectedCourt(court);
    setStep('game-details');
  };

  const handleCreateNewCourt = () => {
    setStep('create-court');
  };

  const handleCourtCreated = (court: BasketballCourt) => {
    setNewCourt(court);
    setSelectedCourt(court);
    setStep('game-details');
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = () => {
    if (!selectedCourt) return;
    if (selectedDays.length === 0) {
      toast.error('Please select at least one day');
      return;
    }
    if (!startTime || !endTime) {
      toast.error('Please select start and end times');
      return;
    }

    const newGame: GameSchedule = {
      id: `game-${Date.now()}`,
      dayOfWeek: selectedDays,
      startTime,
      endTime,
      recurring,
      description: description || `${recurring === 'daily' ? 'Daily' : recurring === 'weekly' ? 'Weekly' : recurring === 'monthly' ? 'Monthly' : 'One-time'} Games`
    };

    // In a real app, this would save to the database
    toast.success('Game reported successfully!', {
      description: `Added ${selectedDays.join(', ')} games at ${selectedCourt.name}`
    });

    // Reset and close
    resetModal();
    onClose();
  };

  const resetModal = () => {
    setStep('search');
    setSearchQuery('');
    setSelectedCourt(null);
    setNewCourt(null);
    setSelectedDays([]);
    setStartTime('');
    setEndTime('');
    setRecurring('weekly');
    setSkillLevel('skilled');
    setDescription('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const activeCourt = selectedCourt || newCourt;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-basketball-primary/20 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-foreground flex items-center gap-2">
            <span className="text-basketball-primary">🏀</span>
            {step === 'search' && 'Report a Game'}
            {step === 'create-court' && 'Create New Court'}
            {step === 'game-details' && 'Game Details'}
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Search for Court */}
        {step === 'search' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by gym name, address, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>

            {/* Search Results */}
            {filteredCourts.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Found Courts</Label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredCourts.map(court => (
                    <button
                      key={court.id}
                      onClick={() => handleSelectCourt(court)}
                      className="w-full p-3 rounded-lg bg-background hover:bg-basketball-primary/10 border border-border hover:border-basketball-primary/30 transition-all text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-basketball-primary/20 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-basketball-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground group-hover:text-basketball-primary transition-colors">
                            {court.name}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {court.address}, {court.city}, {court.state}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${court.type === 'indoor' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                              {court.type}
                            </span>
                            {court.games.length > 0 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-basketball-primary/20 text-basketball-primary">
                                🔥 {court.games.length} game{court.games.length > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results - Create New */}
            {searchQuery.trim().length > 2 && filteredCourts.length === 0 && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Court not found</p>
                  <p className="text-sm text-muted-foreground">
                    Can't find "{searchQuery}"? Add it to the map!
                  </p>
                </div>
                <Button 
                  onClick={handleCreateNewCourt}
                  className="bg-basketball-primary hover:bg-basketball-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Court
                </Button>
              </div>
            )}

            {/* Initial State */}
            {!searchQuery.trim() && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-basketball-primary/20 flex items-center justify-center">
                  <Search className="w-8 h-8 text-basketball-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Search for a court</p>
                  <p className="text-sm text-muted-foreground">
                    Start typing to find existing courts or create a new one
                  </p>
                </div>
              </div>
            )}

            {/* Create New Court Button */}
            {searchQuery.trim().length > 0 && filteredCourts.length > 0 && (
              <Button 
                variant="outline" 
                onClick={handleCreateNewCourt}
                className="w-full border-dashed border-basketball-primary/30 text-basketball-primary hover:bg-basketball-primary/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Can't find it? Create new court
              </Button>
            )}
          </div>
        )}

        {/* Step 2: Create New Court */}
        {step === 'create-court' && (
          <CreateCourtForm 
            onCourtCreated={handleCourtCreated}
            onBack={() => setStep('search')}
            initialAddress={searchQuery}
          />
        )}

        {/* Step 3: Game Details */}
        {step === 'game-details' && activeCourt && (
          <div className="space-y-6">
            {/* Selected Court Info */}
            <div className="p-3 rounded-lg bg-basketball-primary/10 border border-basketball-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-basketball-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-basketball-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{activeCourt.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {activeCourt.address}, {activeCourt.city}
                  </p>
                </div>
              </div>
            </div>

            {/* Days Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-basketball-primary" />
                Days
              </Label>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map(day => (
                  <button
                    key={day}
                    onClick={() => handleDayToggle(day)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedDays.includes(day)
                        ? 'bg-basketball-primary text-primary-foreground'
                        : 'bg-background border border-border text-muted-foreground hover:border-basketball-primary/30'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-basketball-primary" />
                  Start Time
                </Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
            </div>

            {/* Recurring */}
            <div className="space-y-2">
              <Label>Recurring</Label>
              <Select value={recurring} onValueChange={(v) => setRecurring(v as typeof recurring)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="once">One Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Skill Level */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4 text-basketball-primary" />
                Skill Level
              </Label>
              <Select value={skillLevel} onValueChange={(v) => setSkillLevel(v as SkillLevel)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {SKILL_LEVELS.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description (optional)</Label>
              <Textarea
                placeholder="Any additional details about the games..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background border-border resize-none"
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setStep('search')}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                className="flex-1 bg-basketball-primary hover:bg-basketball-primary/90"
              >
                Report Game
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
