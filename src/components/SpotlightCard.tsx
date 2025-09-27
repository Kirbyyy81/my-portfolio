
import React, { useRef, useState, useEffect } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightStyle, setSpotlightStyle] = useState({});

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setSpotlightStyle({
          background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
        });
      }
    };

    const cardElement = cardRef.current;
    cardElement?.addEventListener('mousemove', handleMouseMove);

    return () => {
      cardElement?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={cardRef} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={spotlightStyle} />
      {children}
    </div>
  );
};

export default SpotlightCard;
