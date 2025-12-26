import { BasketballCourt } from '@/types/court';

export const mockCourts: BasketballCourt[] = [
  // LA Fitness - Quince Orchard (with games)
  {
    id: 'la-fitness-qo',
    name: 'LA Fitness - Quince Orchard',
    address: '15710 Shady Grove Rd',
    city: 'Gaithersburg',
    state: 'MD',
    country: 'USA',
    coordinates: {
      lat: 39.1182,
      lng: -77.2011
    },
    type: 'indoor',
    isGym: true,
    gymName: 'LA Fitness',
    photos: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800',
      'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800'
    ],
    quality: {
      overall: 4,
      surface: 4,
      hoops: 4,
      lighting: 5,
      maintenance: 4
    },
    averageSkillLevel: 'skilled',
    games: [
      {
        id: 'qo-pickup-1',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        startTime: '17:00',
        endTime: '20:00',
        recurring: 'daily',
        description: 'Daily Pickup Games'
      }
    ],
    numberOfCourts: 2,
    hasLighting: true,
    isFree: false,
    membershipRequired: true,
    reportedBy: 47,
    lastUpdated: '2024-01-15'
  },
  // LA Fitness - Copley Place Downtown Crown (with games)
  {
    id: 'la-fitness-copley',
    name: 'LA Fitness - Copley Place',
    address: '200 Crown Park Ave',
    city: 'Gaithersburg',
    state: 'MD',
    country: 'USA',
    coordinates: {
      lat: 39.1089,
      lng: -77.2139
    },
    type: 'indoor',
    isGym: true,
    gymName: 'LA Fitness',
    photos: [
      'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800'
    ],
    quality: {
      overall: 4,
      surface: 5,
      hoops: 4,
      lighting: 5,
      maintenance: 4
    },
    averageSkillLevel: 'high-level',
    games: [
      {
        id: 'copley-saturday-1',
        dayOfWeek: ['Saturday'],
        startTime: '09:00',
        endTime: '11:30',
        recurring: 'weekly',
        description: 'Weekly Saturday Games'
      }
    ],
    numberOfCourts: 2,
    hasLighting: true,
    isFree: false,
    membershipRequired: true,
    reportedBy: 32,
    lastUpdated: '2024-01-14'
  },
  // Additional courts without games
  {
    id: 'bohrer-park',
    name: 'Bohrer Park Basketball Courts',
    address: '506 S Frederick Ave',
    city: 'Gaithersburg',
    state: 'MD',
    country: 'USA',
    coordinates: {
      lat: 39.1356,
      lng: -77.2014
    },
    type: 'outdoor',
    isGym: false,
    photos: [
      'https://images.unsplash.com/photo-1505666287802-931dc83948e9?w=800'
    ],
    quality: {
      overall: 3,
      surface: 3,
      hoops: 3,
      lighting: 2,
      maintenance: 3
    },
    averageSkillLevel: 'mediocre',
    games: [],
    numberOfCourts: 2,
    hasLighting: true,
    isFree: true,
    reportedBy: 18,
    lastUpdated: '2024-01-10'
  },
  {
    id: 'rio-rec',
    name: 'Rio Washingtonian Recreation Center',
    address: '9830 Washingtonian Blvd',
    city: 'Gaithersburg',
    state: 'MD',
    country: 'USA',
    coordinates: {
      lat: 39.1178,
      lng: -77.1889
    },
    type: 'indoor',
    isGym: true,
    gymName: 'Montgomery County Recreation',
    photos: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'
    ],
    quality: {
      overall: 4,
      surface: 4,
      hoops: 4,
      lighting: 4,
      maintenance: 4
    },
    averageSkillLevel: 'skilled',
    games: [],
    numberOfCourts: 1,
    hasLighting: true,
    isFree: false,
    membershipRequired: false,
    reportedBy: 23,
    lastUpdated: '2024-01-12'
  },
  {
    id: 'lakeforest-mall',
    name: 'Lakeforest Mall Courts',
    address: '701 Russell Ave',
    city: 'Gaithersburg',
    state: 'MD',
    country: 'USA',
    coordinates: {
      lat: 39.1451,
      lng: -77.2167
    },
    type: 'outdoor',
    isGym: false,
    photos: [
      'https://images.unsplash.com/photo-1505666287802-931dc83948e9?w=800'
    ],
    quality: {
      overall: 2,
      surface: 2,
      hoops: 2,
      lighting: 1,
      maintenance: 2
    },
    averageSkillLevel: 'amateur',
    games: [],
    numberOfCourts: 1,
    hasLighting: false,
    isFree: true,
    reportedBy: 8,
    lastUpdated: '2024-01-08'
  },
  {
    id: 'montgomery-village',
    name: 'Montgomery Village Sports Pavilion',
    address: '19310 Club House Rd',
    city: 'Montgomery Village',
    state: 'MD',
    country: 'USA',
    coordinates: {
      lat: 39.1678,
      lng: -77.1956
    },
    type: 'indoor',
    isGym: true,
    gymName: 'Sports Pavilion',
    photos: [
      'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800'
    ],
    quality: {
      overall: 3,
      surface: 3,
      hoops: 4,
      lighting: 4,
      maintenance: 3
    },
    averageSkillLevel: 'mediocre',
    games: [],
    numberOfCourts: 2,
    hasLighting: true,
    isFree: false,
    membershipRequired: true,
    reportedBy: 15,
    lastUpdated: '2024-01-09'
  },
  // Rockville courts
  {
    id: 'lifetime-rockville',
    name: 'Life Time Fitness - Rockville',
    address: '9861 Washingtonian Blvd',
    city: 'Rockville',
    state: 'MD',
    country: 'USA',
    coordinates: {
      lat: 39.0845,
      lng: -77.1523
    },
    type: 'indoor',
    isGym: true,
    gymName: 'Life Time Fitness',
    photos: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'
    ],
    quality: {
      overall: 5,
      surface: 5,
      hoops: 5,
      lighting: 5,
      maintenance: 5
    },
    averageSkillLevel: 'high-level',
    games: [],
    numberOfCourts: 3,
    hasLighting: true,
    isFree: false,
    membershipRequired: true,
    reportedBy: 56,
    lastUpdated: '2024-01-14'
  },
  // DC Courts
  {
    id: 'turkey-thicket',
    name: 'Turkey Thicket Recreation Center',
    address: '1100 Michigan Ave NE',
    city: 'Washington',
    state: 'DC',
    country: 'USA',
    coordinates: {
      lat: 38.9312,
      lng: -76.9878
    },
    type: 'indoor',
    isGym: true,
    gymName: 'DC Parks & Recreation',
    photos: [
      'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800'
    ],
    quality: {
      overall: 4,
      surface: 4,
      hoops: 4,
      lighting: 4,
      maintenance: 3
    },
    averageSkillLevel: 'skilled',
    games: [],
    numberOfCourts: 2,
    hasLighting: true,
    isFree: true,
    reportedBy: 89,
    lastUpdated: '2024-01-15'
  },
  // Toronto Court (Canada example)
  {
    id: 'moss-park',
    name: 'Moss Park Arena Courts',
    address: '140 Sherbourne St',
    city: 'Toronto',
    state: 'ON',
    country: 'Canada',
    coordinates: {
      lat: 43.6547,
      lng: -79.3689
    },
    type: 'indoor',
    isGym: true,
    gymName: 'City of Toronto',
    photos: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'
    ],
    quality: {
      overall: 3,
      surface: 3,
      hoops: 4,
      lighting: 4,
      maintenance: 3
    },
    averageSkillLevel: 'skilled',
    games: [],
    numberOfCourts: 2,
    hasLighting: true,
    isFree: true,
    reportedBy: 42,
    lastUpdated: '2024-01-13'
  }
];

export const getCourtsByRadius = (
  centerLat: number,
  centerLng: number,
  radiusMiles: number
): BasketballCourt[] => {
  return mockCourts.filter(court => {
    const distance = calculateDistance(
      centerLat,
      centerLng,
      court.coordinates.lat,
      court.coordinates.lng
    );
    return distance <= radiusMiles;
  });
};

export const getCourtsWithGames = (courts: BasketballCourt[]): BasketballCourt[] => {
  return courts.filter(court => court.games.length > 0);
};

// Haversine formula to calculate distance in miles
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
