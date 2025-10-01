import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
}

interface ToolCardProps {
  tool: Tool;
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
      style={{ borderLeft: `4px solid ${tool.color}` }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-12 h-12 border-2 border-current rounded-full" style={{ color: tool.color }}></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-current rounded-lg rotate-45" style={{ color: tool.color }}></div>
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full opacity-20"
          style={{
            backgroundColor: tool.color,
            left: `${20 + i * 25}%`,
            top: `${30 + i * 15}%`,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">
        {/* Icon and Category */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            animate={{ 
              rotate: isHovered ? [0, 10, -10, 0] : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
            className="text-4xl"
          >
            {tool.icon}
          </motion.div>
          <span 
            className="text-xs font-medium px-2 py-1 rounded-full text-white"
            style={{ backgroundColor: tool.color }}
          >
            {tool.category}
          </span>
        </div>

        {/* Tool Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 font-chewy">
          {tool.name}
        </h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-gray-600 leading-relaxed"
        >
          {tool.description}
        </motion.p>

        {/* Hover Indicator */}
        <motion.div
          className="absolute bottom-4 right-4 text-xs opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{ color: tool.color }}
        >
          ✨
        </motion.div>
      </div>

      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{ 
          boxShadow: `0 0 30px ${tool.color}`,
          filter: 'blur(10px)'
        }}
      ></div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
        animate={{
          x: isHovered ? ['-100%', '200%'] : '-100%'
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default ToolCard;