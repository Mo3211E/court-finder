import React, { useState } from 'react';
import { ArrowLeft, MapPin, Building2, Sun, DollarSign, Lightbulb } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { BasketballCourt, CourtQuality, SkillLevel } from '@/types/court';
import { toast } from 'sonner';

interface CreateCourtFormProps {
  onCourtCreated: (court: BasketballCourt) => void;
  onBack: () => void;
  initialAddress?: string;
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 
  'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 
  'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
];

const CANADA_PROVINCES = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

export const CreateCourtForm = ({ onCourtCreated, onBack, initialAddress }: CreateCourtFormProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState(initialAddress || '');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState<'USA' | 'Canada'>('USA');
  const [courtType, setCourtType] = useState<'indoor' | 'outdoor'>('indoor');
  const [isGym, setIsGym] = useState(true);
  const [gymName, setGymName] = useState('');
  const [numberOfCourts, setNumberOfCourts] = useState(1);
  const [hasLighting, setHasLighting] = useState(true);
  const [isFree, setIsFree] = useState(false);
  const [membershipRequired, setMembershipRequired] = useState(true);
  const [overallQuality, setOverallQuality] = useState<number>(3);

  const handleSubmit = () => {
    if (!name.trim() || !address.trim() || !city.trim() || !state) {
      toast.error('Please fill in all required fields');
      return;
    }

    const quality: CourtQuality = {
      overall: overallQuality as 1 | 2 | 3 | 4 | 5,
      surface: overallQuality as 1 | 2 | 3 | 4 | 5,
      hoops: overallQuality as 1 | 2 | 3 | 4 | 5,
      lighting: hasLighting ? (overallQuality as 1 | 2 | 3 | 4 | 5) : 1,
      maintenance: overallQuality as 1 | 2 | 3 | 4 | 5
    };

    const newCourt: BasketballCourt = {
      id: `court-${Date.now()}`,
      name: name.trim(),
      address: address.trim(),
      city: city.trim(),
      state,
      country,
      coordinates: {
        // Default to Gaithersburg area - in a real app, would use geocoding
        lat: 39.1182 + (Math.random() - 0.5) * 0.05,
        lng: -77.2011 + (Math.random() - 0.5) * 0.05
      },
      type: courtType,
      isGym,
      gymName: isGym ? gymName : undefined,
      photos: [
        courtType === 'indoor' 
          ? 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'
          : 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?w=800'
      ],
      quality,
      averageSkillLevel: 'skilled',
      games: [],
      numberOfCourts,
      hasLighting,
      isFree,
      membershipRequired: isGym ? membershipRequired : undefined,
      reportedBy: 1,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    toast.success('Court created successfully!');
    onCourtCreated(newCourt);
  };

  const stateOptions = country === 'USA' ? US_STATES : CANADA_PROVINCES;

  return (
    <div className="space-y-5">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-muted-foreground hover:text-foreground -ml-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to search
      </Button>

      {/* Name */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-basketball-primary" />
          Court/Gym Name *
        </Label>
        <Input
          placeholder="e.g., LA Fitness, Central Park Courts"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-basketball-primary" />
          Address *
        </Label>
        <Input
          placeholder="Street address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* City, State, Country */}
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label>City *</Label>
          <Input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-background border-border"
          />
        </div>
        <div className="space-y-2">
          <Label>State *</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border max-h-48">
              {stateOptions.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Country</Label>
          <Select value={country} onValueChange={(v) => { setCountry(v as 'USA' | 'Canada'); setState(''); }}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Court Type */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-basketball-primary" />
          Court Type
        </Label>
        <div className="flex gap-3">
          <button
            onClick={() => setCourtType('indoor')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              courtType === 'indoor'
                ? 'bg-basketball-primary text-primary-foreground'
                : 'bg-background border border-border text-muted-foreground hover:border-basketball-primary/30'
            }`}
          >
            🏟️ Indoor
          </button>
          <button
            onClick={() => setCourtType('outdoor')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              courtType === 'outdoor'
                ? 'bg-basketball-primary text-primary-foreground'
                : 'bg-background border border-border text-muted-foreground hover:border-basketball-primary/30'
            }`}
          >
            ☀️ Outdoor
          </button>
        </div>
      </div>

      {/* Is it a gym? */}
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-basketball-primary" />
          Part of a gym?
        </Label>
        <Switch checked={isGym} onCheckedChange={setIsGym} />
      </div>

      {/* Gym Name */}
      {isGym && (
        <div className="space-y-2">
          <Label>Gym Name</Label>
          <Input
            placeholder="e.g., LA Fitness, Planet Fitness"
            value={gymName}
            onChange={(e) => setGymName(e.target.value)}
            className="bg-background border-border"
          />
        </div>
      )}

      {/* Number of Courts */}
      <div className="space-y-2">
        <Label>Number of Courts: {numberOfCourts}</Label>
        <Slider
          value={[numberOfCourts]}
          onValueChange={(v) => setNumberOfCourts(v[0])}
          min={1}
          max={10}
          step={1}
          className="py-2"
        />
      </div>

      {/* Quality Rating */}
      <div className="space-y-2">
        <Label>Overall Quality: {overallQuality}/5</Label>
        <Slider
          value={[overallQuality]}
          onValueChange={(v) => setOverallQuality(v[0])}
          min={1}
          max={5}
          step={1}
          className="py-2"
        />
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-basketball-primary" />
            Has Lighting
          </Label>
          <Switch checked={hasLighting} onCheckedChange={setHasLighting} />
        </div>
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-basketball-primary" />
            Free to Play
          </Label>
          <Switch checked={isFree} onCheckedChange={setIsFree} />
        </div>
        {isGym && !isFree && (
          <div className="flex items-center justify-between">
            <Label>Membership Required</Label>
            <Switch checked={membershipRequired} onCheckedChange={setMembershipRequired} />
          </div>
        )}
      </div>

      {/* Submit */}
      <Button 
        onClick={handleSubmit}
        className="w-full bg-basketball-primary hover:bg-basketball-primary/90"
      >
        Create Court
      </Button>
    </div>
  );
};
