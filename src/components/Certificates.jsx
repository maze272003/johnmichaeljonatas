import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import CertificateModal from './CertificateModal';

// Import your certificate images
import awsArchImg from '../assets/cert/aws_cloud_arch.png';
import awsSem1Img from '../assets/cert/aws_cloud_sem1.jpg';
import innovex from '../assets/cert/innovex2025.png';

const certificatesData = [
  { id: 1, title: 'AWS Cloud Architect', issuer: 'Amazon Web Services', imageUrl: awsArchImg, link: '#' },
  { id: 2, title: 'AWS Cloud Semester 1', issuer: 'Amazon Web Services', imageUrl: awsSem1Img, link: '#' },
  { id: 3, title: 'Innovex 2025', issuer: 'International Presentation', imageUrl: innovex, link: '#' },
];

// Step 1: Add a custom hook to check screen size
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};


function Certificates() {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCert, setSelectedCert] = useState(null);
  const lastTap = useRef(0);
  
  const isMobile = useIsMobile(); // <-- Use the hook here

  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const restartTimerRef = useRef(null);

  // Auto-scroll logic now only runs if isMobile is true
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isMobile) { // <-- Check if it's mobile
      return; // Do nothing on desktop
    }
    
    const startAutoScroll = () => {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = setInterval(() => {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }, 30);
    };

    const stopAutoScroll = () => {
      clearInterval(autoScrollIntervalRef.current);
    };

    const handleUserInteraction = () => {
      stopAutoScroll();
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = setTimeout(startAutoScroll, 5000);
    };

    startAutoScroll();

    container.addEventListener('wheel', handleUserInteraction, { passive: true });
    container.addEventListener('touchstart', handleUserInteraction, { passive: true });
    container.addEventListener('mousedown', handleUserInteraction);

    return () => {
      container.removeEventListener('wheel', handleUserInteraction);
      container.removeEventListener('touchstart', handleUserInteraction);
      container.removeEventListener('mousedown', handleUserInteraction);
      clearInterval(autoScrollIntervalRef.current);
      clearTimeout(restartTimerRef.current);
    };
  }, [isMobile]); // Re-run effect if screen size changes across the breakpoint

  const handleDoubleClick = (imageUrl) => {
    setSelectedCert(imageUrl);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };
  
  const handleTouchEnd = (imageUrl) => {
    const now = new Date().getTime();
    if (now - lastTap.current < 300) {
      handleDoubleClick(imageUrl);
    }
    lastTap.current = now;
  };

  // Step 2: Conditionally choose which array to display
  const certsToDisplay = isMobile ? [...certificatesData, ...certificatesData] : certificatesData;

  return (
    <>
      <section id="certificates" className="certificates" ref={sectionRef}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="number">04.</span>
          My Certificates
        </motion.h2>

      <div className="certificates-wrapper">
          <motion.div 
            ref={scrollContainerRef}
            className="certificates-scroll-container"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Step 3: Map over the correct array */}
            {certsToDisplay.map((cert, index) => (
              <div 
                key={`${cert.id}-${index}`}
                className="certificate-card"
                onDoubleClick={() => handleDoubleClick(cert.imageUrl)}
                onTouchEnd={() => handleTouchEnd(cert.imageUrl)}
              >
                <img src={cert.imageUrl} alt={cert.title} className="certificate-image" loading="lazy" />
                <div className="certificate-info">
                  <h3>{cert.title}</h3>
                  <p>{cert.issuer}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedCert && (
          <CertificateModal imageUrl={selectedCert} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}

export default Certificates;