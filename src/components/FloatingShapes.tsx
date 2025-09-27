import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes: React.FC = () => {
  const shapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 30,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    color: ['#7a458c', '#9d8cc2', '#6f7d96', '#c8ccd4'][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full opacity-10"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: shape.color,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Additional decorative elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-purple-300/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-24 h-24 border-2 border-purple-400/20 rounded-lg"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default FloatingShapes;