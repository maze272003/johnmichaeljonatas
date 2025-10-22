import React, { useEffect } from 'react';
import { motion } from 'framer-motion'; // <-- IMPORT motion
import { X } from 'lucide-react';

// Variants for the backdrop animation (fade-in)
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Variants for the modal animation (zoom-in with a spring effect)
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
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

function CertificateModal({ imageUrl, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Animate out when component is removed
    >
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants} // No need for initial/animate/exit here, it inherits
      >
        <img src={imageUrl} alt="Certificate Preview" className="modal-image" />
        <button className="modal-close-btn" onClick={onClose}>
          <X size={32} />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default CertificateModal;