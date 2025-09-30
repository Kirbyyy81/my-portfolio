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

const GetToKnowMe: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch('/src/data/personalCards.json');
        if (response.ok) {
          const data = await response.json();
          setCards(data);
        } else {
          // Fallback data if JSON fails to load
          setCards(fallbackCards);
        }
      } catch (error) {
        console.error('Failed to load personal cards:', error);
        setCards(fallbackCards);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  // Fallback data
  const fallbackCards: CardData[] = [
    {
      id: "personality",
      front: { title: "INTP", subtitle: "The Architect", icon: "🧠" },
      back: {
        title: "The Curious Mind",
        description: "My personality type is INTP — curious, imaginative, and always exploring new ideas. I love diving deep into complex problems and finding creative solutions.",
        details: ["Loves theoretical concepts", "Enjoys debugging mysteries", "Always asking 'what if?'"]
      },
      color: "#7a458c"
    },
    {
      id: "sleep",
      front: { title: "Sleeper Extraordinaire", subtitle: "Professional Dreamer", icon: "😴" },
      back: {
        title: "Dream Architect",
        description: "I can sleep anywhere, anytime. My friends joke that I have a PhD in napping. Some of my best coding ideas actually come from dreams!",
        details: ["Can nap in 15 minutes", "Dreams in code sometimes", "Bed = favorite workspace"]
      },
      color: "#9d8cc2"
    },
    {
      id: "kirby",
      front: { title: "Kirby's #1 Fan", subtitle: "Pink Puffball Enthusiast", icon: "🌸" },
      back: {
        title: "Poyo! 💖",
        description: "Kirby represents everything I love: cute, powerful, and endlessly adaptable. Plus, who doesn't want to absorb skills by eating things?",
        details: ["Has 20+ Kirby plushies", "Speedruns Kirby games", "Kirby-themed everything"]
      },
      color: "#c8ccd4"
    },
    {
      id: "coder",
      front: { title: "3AM Coder", subtitle: "Night Owl Developer", icon: "🌙" },
      back: {
        title: "Midnight Magic",
        description: "My brain works best when the world is quiet. There's something magical about coding under the stars with lo-fi music playing.",
        details: ["Peak productivity: 11PM-3AM", "Coffee is life fuel", "Debugging by moonlight"]
      },
      color: "#6f7d96"
    },
    {
      id: "plants",
      front: { title: "Plant Parent", subtitle: "Green Thumb Wannabe", icon: "🌱" },
      back: {
        title: "Gerald & Friends",
        description: "I talk to my plants (especially Gerald, my fiddle leaf fig). They're great listeners and never judge my code. Currently keeping 12 plants alive!",
        details: ["Names all plants", "Plays music for them", "Success rate: 85%"]
      },
      color: "#7a458c"
    },
    {
      id: "music",
      front: { title: "Lo-Fi Addict", subtitle: "Chill Beats Curator", icon: "🎵" },
      back: {
        title: "Soundtrack of Code",
        description: "Lo-fi hip hop isn't just background music—it's my coding fuel. I've curated the perfect playlist for every type of programming task.",
        details: ["500+ hour playlists", "Vinyl collection growing", "Piano player since age 7"]
      },
      color: "#9d8cc2"
    }
  ];

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
          {cards.map((card, index) => (
            <FlipCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default GetToKnowMe;