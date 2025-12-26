import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BasketballCourt, MapFilters } from '@/types/court';
import { mockCourts, getCourtsByRadius, getCourtsWithGames } from '@/data/mockCourts';
import { CourtDetailModal } from '@/components/map/CourtDetailModal';
import { GamesHotbar } from '@/components/map/GamesHotbar';
import { RadiusSelector } from '@/components/map/RadiusSelector';
import { MapLegend } from '@/components/map/MapLegend';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MapPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const navigate = useNavigate();

  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenInput, setTokenInput] = useState<string>('');
  const [isMapReady, setIsMapReady] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<BasketballCourt | null>(null);
  const [filters, setFilters] = useState<MapFilters>({
    radius: 25,
    showOnlyWithGames: false,
    courtType: 'all',
    skillLevel: 'all'
  });
  const [userLocation, setUserLocation] = useState({
    lat: 39.1182, // Gaithersburg, MD default
    lng: -77.2011
  });
  const [visibleCourts, setVisibleCourts] = useState<BasketballCourt[]>([]);
  const [courtsWithGames, setCourtsWithGames] = useState<BasketballCourt[]>([]);

  // Get courts based on filters
  useEffect(() => {
    const courts = getCourtsByRadius(userLocation.lat, userLocation.lng, filters.radius);
    setVisibleCourts(courts);
    setCourtsWithGames(getCourtsWithGames(courts));
  }, [userLocation, filters.radius]);

  // Create custom marker element
  const createMarkerElement = useCallback((court: BasketballCourt, zoom: number) => {
    const hasGames = court.games.length > 0;
    const isZoomedOut = zoom < 10;

    const el = document.createElement('div');
    el.className = 'court-marker';

    if (isZoomedOut) {
      // Show as dot when zoomed out
      el.innerHTML = `
        <div class="relative flex items-center justify-center">
          ${hasGames ? '<div class="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse opacity-60"></div>' : ''}
          <div class="w-3 h-3 rounded-full ${hasGames ? 'bg-basketball-primary shadow-lg shadow-orange-500/50' : 'bg-basketball-primary'}" 
               style="box-shadow: ${hasGames ? '0 0 15px 5px rgba(255, 100, 0, 0.6)' : 'none'}">
          </div>
          ${hasGames ? '<div class="absolute -inset-3 border-2 border-red-500 rounded-full animate-ping opacity-40"></div>' : ''}
        </div>
      `;
    } else {
      // Show as text label when zoomed in
      el.innerHTML = `
        <div class="relative cursor-pointer group">
          ${hasGames ? `
            <div class="absolute -inset-2 bg-gradient-radial from-orange-500/40 via-red-500/20 to-transparent rounded-lg animate-pulse"></div>
            <div class="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center">
              <span class="text-lg" style="filter: drop-shadow(0 0 4px rgba(255, 100, 0, 0.8));">🔥</span>
            </div>
          ` : ''}
          <div class="relative px-2 py-1 rounded-md ${hasGames ? 'bg-basketball-primary/90' : 'bg-gray-700/80'} backdrop-blur-sm">
            <span class="text-xs font-bold whitespace-nowrap"
                  style="color: ${hasGames ? '#ff6b00' : '#9ca3af'}; 
                         text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 8px ${hasGames ? 'rgba(255, 107, 0, 0.8)' : 'transparent'};">
              ${court.name}
            </span>
          </div>
        </div>
      `;
    }

    el.addEventListener('click', () => setSelectedCourt(court));
    return el;
  }, []);

  // Update markers based on zoom
  const updateMarkers = useCallback(() => {
    if (!map.current) return;

    const zoom = map.current.getZoom();

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    visibleCourts.forEach(court => {
      const el = createMarkerElement(court, zoom);
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([court.coordinates.lng, court.coordinates.lat])
        .addTo(map.current!);
      markersRef.current.push(marker);
    });
  }, [visibleCourts, createMarkerElement]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [userLocation.lng, userLocation.lat],
        zoom: 11,
        maxBounds: [
          [-180, 5], // Southwest: covers all of North America
          [-40, 85] // Northeast: covers all of North America
        ]
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }),
        'top-right'
      );

      map.current.on('load', () => {
        setIsMapReady(true);
        updateMarkers();
      });

      map.current.on('zoom', () => {
        updateMarkers();
      });

      map.current.on('moveend', () => {
        if (map.current) {
          const center = map.current.getCenter();
          setUserLocation({ lat: center.lat, lng: center.lng });
        }
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Update markers when courts change
  useEffect(() => {
    if (isMapReady) {
      updateMarkers();
    }
  }, [isMapReady, updateMarkers]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput.trim());
    }
  };

  if (!mapboxToken) {
    return (
      <div className="min-h-screen bg-basketball-dark flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-2xl p-8 shadow-2xl border border-basketball-primary/20">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-basketball-primary/20 flex items-center justify-center">
              <Key className="w-8 h-8 text-basketball-primary" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              Enter Mapbox Token
            </h1>
            <p className="text-muted-foreground text-sm">
              To use the map feature, please enter your Mapbox public token. 
              You can get one for free at{' '}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-basketball-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>

          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="pk.eyJ1..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="bg-background border-border"
            />
            <Button type="submit" className="w-full bg-basketball-primary hover:bg-basketball-primary/90">
              Load Map
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-basketball-dark">
      {/* Back button */}
      <Button
        variant="outline"
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 bg-card/90 backdrop-blur-sm border-basketball-primary/30 hover:bg-basketball-primary/20"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Radius selector */}
      <RadiusSelector
        radius={filters.radius}
        onRadiusChange={(radius) => setFilters(prev => ({ ...prev, radius }))}
      />

      {/* Map Legend */}
      <MapLegend />

      {/* Map container */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Games Hotbar */}
      <GamesHotbar 
        courts={courtsWithGames} 
        onCourtClick={setSelectedCourt}
      />

      {/* Court Detail Modal */}
      {selectedCourt && (
        <CourtDetailModal
          court={selectedCourt}
          onClose={() => setSelectedCourt(null)}
        />
      )}
    </div>
  );
};

export default MapPage;
