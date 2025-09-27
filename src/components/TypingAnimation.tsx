
import React from 'react';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, className }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.1,
      },
    }),
  };

  return (
    <motion.div className={className}>
      {text.split('').map((char, i) => (
        <motion.span key={i} custom={i} initial="hidden" animate="visible" variants={variants}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TypingAnimation;
