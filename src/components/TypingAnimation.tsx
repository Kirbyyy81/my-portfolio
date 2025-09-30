import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const controls = useAnimation();

  useEffect(() => {
    const type = async () => {
      await controls.start({ opacity: 1, transition: { duration: 0 } });
      for (let i = 0; i <= text.length; i++) {
        setDisplayedText(text.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    };
    type();
  }, [text, controls]);

  return (
    <motion.div className={className} initial={{ opacity: 0 }} animate={controls}>
      {displayedText}
      <motion.span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          backgroundColor: 'currentColor',
          marginLeft: '4px',
          verticalAlign: 'bottom',
        }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default TypingAnimation;