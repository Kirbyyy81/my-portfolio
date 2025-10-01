import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 cursor-zoom-out"
          onClick={onClose}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain shadow-lg rounded-lg cursor-default"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking on the image
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;