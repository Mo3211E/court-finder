import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FixedMapButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/map')}
      className="fixed top-20 left-4 z-50 bg-basketball-primary hover:bg-basketball-primary/90 
                 text-basketball-dark font-heading font-bold shadow-lg shadow-basketball-primary/30
                 transition-all duration-300 hover:scale-105"
    >
      <Map className="w-4 h-4 mr-2" />
      Map
    </Button>
  );
};
