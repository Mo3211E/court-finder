interface BasketballIconProps {
  className?: string;
}

export const BasketballIcon = ({ className = "w-6 h-6" }: BasketballIconProps) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.9" />
      <path 
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" 
        fill="currentColor" 
        opacity="0.3"
      />
      {/* Horizontal line */}
      <path 
        d="M2.5 12h19" 
        stroke="hsl(0 0% 20%)" 
        strokeWidth="0.75" 
        fill="none"
        opacity="0.6"
      />
      {/* Vertical line */}
      <path 
        d="M12 2.5v19" 
        stroke="hsl(0 0% 20%)" 
        strokeWidth="0.75" 
        fill="none"
        opacity="0.6"
      />
      {/* Curved lines */}
      <path 
        d="M4 7.5 Q 8 12 4 16.5" 
        stroke="hsl(0 0% 20%)" 
        strokeWidth="0.75" 
        fill="none"
        opacity="0.6"
      />
      <path 
        d="M20 7.5 Q 16 12 20 16.5" 
        stroke="hsl(0 0% 20%)" 
        strokeWidth="0.75" 
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
};
