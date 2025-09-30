import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CardData {
  id: string;
  front: {
    title: string;
    subtitle: string;
    icon: string;
  };
  back: {
    title: string;
    description: string;
    details: string[];
  };
  color: string;
}

interface FlipCardProps {
  card: CardData;
  index: number;
}

const FlipCard: React.FC<FlipCardProps> = ({ card, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative w-full h-80 cursor-pointer group"
      onClick={handleFlip}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card Container */}
      <div className="relative w-full h-full preserve-3d transition-transform duration-700 ease-out"
           style={{ 
             transformStyle: 'preserve-3d',
             transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
           }}>
        
        {/* Front Side */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl shadow-lg overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div 
            className="w-full h-full p-8 flex flex-col items-center justify-center text-white relative overflow-hidden"
            style={{ backgroundColor: card.color }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-white rounded-lg rotate-45"></div>
              <div className="absolute top-1/2 left-4 w-4 h-4 bg-white rounded-full"></div>
            </div>
            
            {/* Floating Particles */}
            {Array.from({ length: 3 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${30 + i * 15}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
            
            {/* Content */}
            <motion.div
              className="text-6xl mb-4"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {card.front.icon}
            </motion.div>
            
            <h3 className="text-2xl font-bold text-center mb-2 font-chewy">
              {card.front.title}
            </h3>
            
            <p className="text-sm opacity-90 text-center font-medium">
              {card.front.subtitle}
            </p>
            
            {/* Hover Indicator */}
            <motion.div
              className="absolute bottom-4 right-4 text-xs opacity-60"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to flip
            </motion.div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl shadow-lg overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="w-full h-full p-6 bg-white/90 backdrop-blur-sm flex flex-col justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-current to-transparent"
                style={{ color: card.color }}
              ></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-gray-800 mb-3 font-chewy">
                {card.back.title}
              </h4>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {card.back.description}
              </p>
              
              <div className="space-y-2">
                {card.back.details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center text-xs text-gray-500"
                  >
                    <div 
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: card.color }}
                    ></div>
                    {detail}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Flip Back Indicator */}
            <motion.div
              className="absolute bottom-4 right-4 text-xs opacity-60"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to flip back
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Hover Glow Effect */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{ 
          boxShadow: `0 0 30px ${card.color}`,
          filter: 'blur(10px)'
        }}
      ></div>
    </motion.div>
  );
};

export default FlipCard;