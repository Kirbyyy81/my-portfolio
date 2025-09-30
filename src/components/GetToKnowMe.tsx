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
    </motion.section>
  );
};

export default GetToKnowMe;