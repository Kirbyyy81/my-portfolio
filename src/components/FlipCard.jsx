import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FlipCard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="relative w-full h-64 cursor-pointer perspective-1000"
      onClick={handleFlip}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          style={{
            background: `linear-gradient(135deg, ${card.color}20, ${card.color}10)`,
            backdropFilter: 'blur(10px)',
            border: `2px solid ${card.color}30`
          }}
        >
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-4xl mb-4"
            >
              {card.icon}
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {card.front}
            </h3>
            <div className="text-sm text-gray-500 opacity-70">
              Tap to reveal more
            </div>
          </div>
          
          {/* Decorative elements */}
          <div 
            className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-60"
            style={{ backgroundColor: card.color }}
          />
          <div 
            className="absolute bottom-4 left-4 w-2 h-2 rounded-full opacity-40"
            style={{ backgroundColor: card.color }}
          />
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 rotate-y-180"
          style={{
            background: `linear-gradient(135deg, ${card.color}30, ${card.color}15)`,
            backdropFilter: 'blur(10px)',
            border: `2px solid ${card.color}40`
          }}
        >
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="text-2xl mb-4 opacity-80">
              {card.icon}
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              {card.back}
            </p>
            <div className="text-xs text-gray-500 opacity-70 mt-4">
              Tap to flip back
            </div>
          </div>
          
          {/* Decorative elements for back */}
          <div 
            className="absolute top-4 left-4 w-3 h-3 rounded-full opacity-60"
            style={{ backgroundColor: card.color }}
          />
          <div 
            className="absolute bottom-4 right-4 w-2 h-2 rounded-full opacity-40"
            style={{ backgroundColor: card.color }}
          />
        </div>
      </motion.div>
      
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${card.color}20, transparent 70%)`,
          opacity: 0
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default FlipCard;