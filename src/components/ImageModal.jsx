import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

// Animation variants for the dark background (backdrop)
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Animation variants for the modal content (the image)
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
};

function ImageModal({ imageUrl, onClose }) {
  // Effect to handle closing the modal with the 'Escape' key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup: remove the event listener when the modal is closed
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose} // Close modal when clicking the dark background
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Animation for when the modal closes
    >
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking the image itself
        variants={modalVariants}
      >
        <img src={imageUrl} alt="Image Preview" className="modal-image" />
        <button className="modal-close-btn" onClick={onClose} aria-label="Close preview">
          <X size={32} />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default ImageModal;