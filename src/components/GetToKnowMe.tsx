import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FlipCard from './FlipCard';

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

import usePortfolioData from '../hooks/usePortfolioData';

const GetToKnowMe: React.FC = () => {
  const { data, loading } = usePortfolioData();

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.section
      id="get-to-know-me-cards"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating shapes */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              backgroundColor: ['#7a458c', '#9d8cc2', '#c8ccd4', '#6f7d96'][Math.floor(Math.random() * 4)],
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4 font-chewy">
            Get to Know Me
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.personalCards.map((card, index) => (
            <FlipCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
                {/* Additional hobbies section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              When I'm not coding...
            </h3>
            <div className="flex justify-center flex-wrap gap-4 max-w-2xl mx-auto">
              {data.hobbies.slice(0, 6).map((hobby, index) => (
                <motion.div
                  key={hobby.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/40 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  style={{ borderLeft: `4px solid ${hobby.color}` }}
                  title={hobby.description}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg group-hover:scale-110 transition-transform">{hobby.icon}</span>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800">{hobby.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
    </motion.section>
  );
};

export default GetToKnowMe;