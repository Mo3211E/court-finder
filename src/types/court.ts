export interface GameSchedule {
  id: string;
  dayOfWeek: string[];
  startTime: string;
  endTime: string;
  recurring: 'daily' | 'weekly' | 'monthly' | 'once';
  description?: string;
}

export interface CourtQuality {
  overall: 1 | 2 | 3 | 4 | 5;
  surface: 1 | 2 | 3 | 4 | 5;
  hoops: 1 | 2 | 3 | 4 | 5;
  lighting: 1 | 2 | 3 | 4 | 5;
  maintenance: 1 | 2 | 3 | 4 | 5;
}

export type SkillLevel = 'amateur' | 'mediocre' | 'skilled' | 'high-level' | 'pro';

export interface BasketballCourt {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: 'USA' | 'Canada';
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'indoor' | 'outdoor';
  isGym: boolean;
  gymName?: string;
  photos: string[];
  quality: CourtQuality;
  averageSkillLevel: SkillLevel;
  games: GameSchedule[];
  numberOfCourts: number;
  hasLighting: boolean;
  isFree: boolean;
  membershipRequired?: boolean;
  reportedBy: number;
  lastUpdated: string;
}

export interface MapFilters {
  radius: number; // in miles
  showOnlyWithGames: boolean;
  courtType: 'all' | 'indoor' | 'outdoor';
  skillLevel: SkillLevel | 'all';
}
