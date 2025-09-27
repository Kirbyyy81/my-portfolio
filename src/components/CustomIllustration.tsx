import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Zap, Heart } from 'lucide-react';

const CustomIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Main character area */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative"
      >
        {/* Central illustration base */}
        <div className="relative w-64 h-64 mx-auto">
          {/* Main circular background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200/40 to-purple-300/40"
          />
          
          {/* Inner decoration circles */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/30 to-purple-500/30"
          />
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-300/40 to-purple-400/40"
          />
          
          {/* Central character representation */}
          <div className="absolute inset-8 rounded-full bg-white/60 backdrop-blur-sm shadow-lg flex items-center justify-center">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl"
            >
              👩‍💻
            </motion.div>
          </div>
        </div>
        
        {/* Floating skill icons */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -left-4 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-lg"
          style={{ borderLeft: '4px solid #7a458c' }}
        >
          <Code2 className="w-6 h-6 text-purple-700" />
        </motion.div>
        
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -top-4 -right-4 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-lg"
          style={{ borderLeft: '4px solid #9d8cc2' }}
        >
          <Palette className="w-6 h-6 text-purple-600" />
        </motion.div>
        
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [0, 15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-4 -left-4 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-lg"
          style={{ borderLeft: '4px solid #6f7d96' }}
        >
          <Zap className="w-6 h-6 text-purple-500" />
        </motion.div>
        
        <motion.div
          animate={{ y: [8, -8, 8], rotate: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-4 -right-4 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-lg"
          style={{ borderLeft: '4px solid #c8ccd4' }}
        >
          <Heart className="w-6 h-6 text-purple-400" />
        </motion.div>
      </motion.div>
      
      {/* Decorative elements around the illustration */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full opacity-60"
      />
      
      <motion.div
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-3 h-3 bg-purple-300 rounded-full opacity-70"
      />
      
      {/* Floating particles */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-200 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default CustomIllustration;