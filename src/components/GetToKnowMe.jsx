import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FlipCard from './FlipCard';

const GetToKnowMe = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch('/personalCards.json');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error loading personal cards:', error);
        // Fallback data
        setCards([
          {
            id: "personality",
            front: "INTP",
            back: "My personality type is INTP — curious, imaginative, and always exploring new ideas!",
            icon: "🧠",
            color: "#7a458c"
          },
          {
            id: "kirby",
            front: "Kirby's #1 Fan",
            back: "Kirby is my spirit animal! Round, pink, and incredibly powerful — just like how I approach coding.",
            icon: "🌸",
            color: "#9d8cc2"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  if (loading) {
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
      id="get-to-know-me"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mb-32"
    >
      <div className="text-center mb-16">
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-5xl font-bold text-gray-800 mb-4"
        >
          Get to Know Me
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Flip the cards to discover the quirky details that make me who I am! 
          From personality traits to random obsessions, here's what makes Ashley tick.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 1.2 + index * 0.1,
              type: "spring",
              stiffness: 100
            }}
          >
            <FlipCard card={card} />
          </motion.div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="relative mt-16">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-8 left-1/4 w-6 h-6 border-2 border-purple-300/30 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute -top-4 right-1/3 w-4 h-4 bg-purple-200/40 rounded-full"
        />
      </div>
    </motion.section>
  );
};

export default GetToKnowMe;